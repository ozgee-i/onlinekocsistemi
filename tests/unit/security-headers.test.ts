import { describe, expect, it } from "vitest";

import { buildContentSecurityPolicy, buildSecurityHeaders } from "@/lib/security/headers";

const header = (isDev: boolean, key: string) =>
  buildSecurityHeaders({ isDev }).find((h) => h.key === key)?.value;

describe("buildContentSecurityPolicy", () => {
  it("üretimde eval'e izin vermez ve HTTPS'e yükseltir", () => {
    const csp = buildContentSecurityPolicy({ isDev: false });
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("çerçeveye gömmeyi, eklentileri ve base etiketi kaçırmayı engeller", () => {
    const csp = buildContentSecurityPolicy({ isDev: false });
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
  });

  it("geliştirmede React hata ayıklaması için eval'e izin verir", () => {
    expect(buildContentSecurityPolicy({ isDev: true })).toContain("'unsafe-eval'");
  });
});

describe("buildSecurityHeaders", () => {
  it("temel güvenlik başlıklarını içerir", () => {
    expect(header(false, "X-Content-Type-Options")).toBe("nosniff");
    expect(header(false, "X-Frame-Options")).toBe("DENY");
    expect(header(false, "Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(header(false, "Permissions-Policy")).toContain("camera=()");
  });

  it("HSTS yalnızca üretimde gönderilir", () => {
    expect(header(false, "Strict-Transport-Security")).toContain("max-age=63072000");
    expect(header(true, "Strict-Transport-Security")).toBeUndefined();
  });
});
