import { describe, expect, it } from "vitest";

import { submitApplication } from "@/app/(marketing)/basvuru/actions";
import { validateApplication } from "@/lib/validation/application";

const valid = {
  fullName: "  Şule Çağlayan Işık ",
  email: " Sule@Example.COM ",
  phone: "",
  examFocus: "YKS",
  studentCount: "6-15",
  message: "",
  kvkkConsent: "on",
};

function formData(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("validateApplication", () => {
  it("Türkçe karakterli geçerli girdiyi kabul eder ve normalleştirir", () => {
    const result = validateApplication(valid);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.fullName).toBe("Şule Çağlayan Işık");
    expect(result.data.email).toBe("sule@example.com");
    expect(result.data.phone).toBeUndefined();
    expect(result.data.message).toBeUndefined();
  });

  it("KVKK onayı olmadan reddeder", () => {
    const result = validateApplication({ ...valid, kvkkConsent: undefined });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.kvkkConsent).toMatch(/onaylamalısınız/);
  });

  it("listede olmayan seçenekleri reddeder", () => {
    const result = validateApplication({ ...valid, examFocus: "<script>", studentCount: "9999" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.examFocus).toBeDefined();
    expect(result.fieldErrors.studentCount).toBeDefined();
  });

  it("geçersiz e-posta ve telefonu reddeder", () => {
    const result = validateApplication({ ...valid, email: "yok", phone: "abc123" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.email).toBeDefined();
    expect(result.fieldErrors.phone).toBeDefined();
  });

  it("aşırı uzun alanları reddeder", () => {
    const result = validateApplication({ ...valid, message: "a".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

describe("submitApplication (Server Action)", () => {
  it("sunucuda da doğrular; istemci doğrulamasına güvenmez", async () => {
    const state = await submitApplication({ status: "idle" }, formData({ email: "x" }));
    expect(state.status).toBe("invalid");
  });

  it("bot tuzağı doluysa hiçbir şey yapmadan başarılı görünür", async () => {
    const state = await submitApplication(
      { status: "idle" },
      formData({ ...valid, website: "http://spam.example" }),
    );
    expect(state.status).toBe("success");
  });

  it("beklenmeyen alanları yok sayar ve geri yansıtmaz", async () => {
    const state = await submitApplication(
      { status: "idle" },
      formData({ ...valid, role: "admin", tenant_id: "x" }),
    );
    expect(state.status).toBe("unavailable");
    expect(state.values).not.toHaveProperty("role");
    expect(state.values).not.toHaveProperty("tenant_id");
  });
});
