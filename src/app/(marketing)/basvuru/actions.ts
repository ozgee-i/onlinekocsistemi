"use server";

import {
  HONEYPOT_FIELD,
  readApplicationForm,
  validateApplication,
  type ApplicationFormState,
} from "@/lib/validation/application";

/**
 * Koç başvurusu.
 * TODO(Faz 2): Supabase `contact_requests` tablosuna kayıt + Turnstile + rate limit + admin bildirimi.
 * O zamana kadar hiçbir veri saklanmaz; kullanıcıya dürüstçe "henüz aktif değil" denir.
 */
export async function submitApplication(
  _prev: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  // Bot tuzağı doldurulmuşsa sessizce başarılı görün; bota ipucu verme.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const raw = readApplicationForm(formData);
  const result = validateApplication(raw);
  if (!result.success) {
    return { status: "invalid", fieldErrors: result.fieldErrors, values: raw };
  }

  return {
    status: "unavailable",
    values: raw,
    message:
      "Çevrimiçi başvuru çok yakında açılıyor. Şimdilik bize e-posta veya Instagram üzerinden ulaşabilirsiniz.",
  };
}
