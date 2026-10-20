import { z } from "./zod";

/** Koç başvuru formu — istemci ve sunucu aynı şemayı kullanır. */

export const examFocusOptions = ["YKS", "LGS", "YKS ve LGS", "YDT", "Diğer"] as const;
export const studentCountOptions = ["1-5", "6-15", "16-30", "30+"] as const;

const phonePattern = /^\+?[0-9\s()-]{10,20}$/;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { error: "Adınızı ve soyadınızı yazın." })
    .max(100, { error: "En fazla 100 karakter olabilir." }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, { error: "E-posta adresi çok uzun." })
    .pipe(z.email({ error: "Geçerli bir e-posta adresi yazın." })),
  phone: z
    .string()
    .trim()
    .max(20, { error: "Telefon numarası çok uzun." })
    .refine((value) => value === "" || phonePattern.test(value), {
      error: "Geçerli bir telefon numarası yazın.",
    })
    .optional()
    .transform((value) => value || undefined),
  examFocus: z.enum(examFocusOptions, { error: "Bir sınav türü seçin." }),
  studentCount: z.enum(studentCountOptions, { error: "Öğrenci sayınızı seçin." }),
  message: z
    .string()
    .trim()
    .max(1000, { error: "En fazla 1000 karakter olabilir." })
    .optional()
    .transform((value) => value || undefined),
  kvkkConsent: z.literal("on", { error: "Devam etmek için aydınlatma metnini onaylamalısınız." }),
});

export type ApplicationInput = z.input<typeof applicationSchema>;
export type ApplicationField = keyof ApplicationInput;

export type ApplicationFormState = {
  status: "idle" | "invalid" | "unavailable" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ApplicationField, string>>;
  values?: Partial<Record<ApplicationField, string>>;
};

/** Bot tuzağı alanının adı (gerçek kullanıcılar görmez, boş bırakır). */
export const HONEYPOT_FIELD = "website";

const fields: ApplicationField[] = [
  "fullName",
  "email",
  "phone",
  "examFocus",
  "studentCount",
  "message",
  "kvkkConsent",
];

/** FormData'yı yalnızca beklenen alanlarla sınırlı düz nesneye çevirir. */
export function readApplicationForm(formData: FormData) {
  const raw: Partial<Record<ApplicationField, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string") raw[field] = value;
  }
  return raw;
}

export function validateApplication(raw: Partial<Record<ApplicationField, string>>) {
  const result = applicationSchema.safeParse(raw);
  if (result.success) return { success: true as const, data: result.data };

  const flat = z.flattenError(result.error).fieldErrors as Partial<
    Record<ApplicationField, string[]>
  >;
  const fieldErrors: Partial<Record<ApplicationField, string>> = {};
  for (const field of fields) {
    const first = flat[field]?.[0];
    if (first) fieldErrors[field] = first;
  }
  return { success: false as const, fieldErrors };
}
