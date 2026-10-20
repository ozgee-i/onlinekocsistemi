/**
 * HTTP güvenlik başlıkları. `next.config.ts` tarafından tüm yanıtlara uygulanır.
 *
 * CSP notu: Tanıtım sitesi statik üretilir (Cache Components / PPR). Nonce tabanlı CSP
 * her isteğin dinamik render edilmesini gerektirdiği için burada kullanılmaz; Next.js'in
 * satır içi RSC script'leri nedeniyle `script-src 'unsafe-inline'` gereklidir.
 * Oturum ve kişisel veri barındıran `app.` hostu için nonce'lu sıkı CSP Faz 2'de eklenecek.
 */

type CspOptions = {
  isDev: boolean;
};

export function buildContentSecurityPolicy({ isDev }: CspOptions): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    // Motion ve React satır içi `style` attribute'ları kullanır.
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "blob:", "data:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "frame-src": ["'none'"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
  };

  const policy = Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");

  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}

export function buildSecurityHeaders({ isDev }: CspOptions) {
  const headers = [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy({ isDev }) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
  ];

  if (!isDev) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
