"use client";

import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { siteConfig } from "@/config/site";
import {
  examFocusOptions,
  HONEYPOT_FIELD,
  readApplicationForm,
  studentCountOptions,
  validateApplication,
  type ApplicationFormState,
} from "@/lib/validation/application";

import { submitApplication } from "./actions";

const initialState: ApplicationFormState = { status: "idle" };

type FieldErrors = NonNullable<ApplicationFormState["fieldErrors"]>;

/**
 * Form doğrudan Server Action'a bağlıdır (JS yüklenmeden de çalışır, CSP'ye uygun).
 * JS varsa gönderimden önce aynı şemayla tarayıcıda doğrulanır; asıl doğrulama sunucudadır.
 */
export function ApplicationForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const errors = clientErrors ?? state.fieldErrors ?? {};
  const values = state.values ?? {};

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateApplication(readApplicationForm(new FormData(event.currentTarget)));
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
      >
        <CircleCheck className="size-10 text-success" aria-hidden />
        <p className="text-lg font-semibold">Başvurunuz alındı</p>
        <p className="text-sm text-muted-foreground">En kısa sürede sizinle iletişime geçeceğiz.</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad soyad" error={errors.fullName}>
          {(props) => (
            <Input
              {...props}
              name="fullName"
              autoComplete="name"
              maxLength={100}
              defaultValue={values.fullName}
              placeholder="Ayşe Yılmaz"
            />
          )}
        </Field>
        <Field label="E-posta" error={errors.email}>
          {(props) => (
            <Input
              {...props}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              defaultValue={values.email}
              placeholder="ornek@eposta.com"
            />
          )}
        </Field>
      </div>

      <Field label="Telefon" optional error={errors.phone}>
        {(props) => (
          <Input
            {...props}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            defaultValue={values.phone}
            placeholder="05xx xxx xx xx"
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Hangi sınava hazırlıyorsunuz?" error={errors.examFocus}>
          {(props) => (
            <Select {...props} name="examFocus" defaultValue={values.examFocus ?? ""}>
              <option value="" disabled>
                Seçin
              </option>
              {examFocusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field label="Yaklaşık öğrenci sayınız" error={errors.studentCount}>
          {(props) => (
            <Select {...props} name="studentCount" defaultValue={values.studentCount ?? ""}>
              <option value="" disabled>
                Seçin
              </option>
              {studentCountOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      <Field label="Mesajınız" optional error={errors.message}>
        {(props) => (
          <Textarea
            {...props}
            name="message"
            maxLength={1000}
            defaultValue={values.message}
            placeholder="Kendinizden ve çalışma şeklinizden kısaca bahsedin."
          />
        )}
      </Field>

      {/* Bot tuzağı: ekran okuyuculardan ve klavyeden gizli. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Web siteniz
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="kvkkConsent"
            defaultChecked={values.kvkkConsent === "on"}
            aria-invalid={errors.kvkkConsent ? true : undefined}
            aria-describedby={errors.kvkkConsent ? "kvkk-error" : undefined}
            className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 accent-primary"
          />
          <span className="text-muted-foreground">
            <Link
              href="/yasal/kvkk"
              target="_blank"
              className="font-medium text-foreground underline underline-offset-2"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum; başvurum için iletişim bilgilerimin işlenmesini kabul ediyorum.
          </span>
        </label>
        <AnimatePresence initial={false}>
          {errors.kvkkConsent && (
            <motion.p
              id="kvkk-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs font-medium text-danger"
            >
              {errors.kvkkConsent}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!clientErrors && (state.status === "unavailable" || state.status === "error") && (
          <motion.div
            key={state.status}
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={
              state.status === "error"
                ? "flex gap-3 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm"
                : "flex gap-3 rounded-lg border border-primary/30 bg-primary-soft p-4 text-sm"
            }
          >
            {state.status === "error" ? (
              <CircleAlert className="size-5 shrink-0 text-danger" aria-hidden />
            ) : (
              <Info className="size-5 shrink-0 text-primary" aria-hidden />
            )}
            <div>
              <p>{state.message}</p>
              {state.status === "unavailable" && (
                <p className="mt-1 text-muted-foreground">
                  <a
                    className="font-medium text-foreground underline"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" loading={pending} className="w-full sm:w-fit">
        {pending ? "Gönderiliyor…" : "Başvuruyu gönder"}
      </Button>
    </form>
  );
}
