"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

import type { FormCopy } from "@/lib/form-content";
import type { Locale } from "@/lib/i18n";

type FieldName = "fullName" | "company" | "email" | "interest" | "consent";
type SubmissionState = "idle" | "sending" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CommercialLeadForm({ locale, copy, interestLabels = {} }: { locale: Locale; copy: FormCopy; interestLabels?: Record<string, string> }) {
  const [submission, setSubmission] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const successRef = useRef<HTMLDivElement>(null);
  const privacyPath = locale === "de" ? "/de/datenschutz" : locale === "tr" ? "/tr/gizlilik" : "/en/privacy";

  useEffect(() => {
    if (submission === "success") successRef.current?.focus();
  }, [submission]);

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of ["fullName", "company", "interest"] as const) {
      if (!String(data.get(field) ?? "").trim()) nextErrors[field] = copy.required;
    }
    const email = String(data.get("email") ?? "").trim();
    if (!email) nextErrors.email = copy.required;
    else if (!emailPattern.test(email)) nextErrors.email = copy.emailError;
    if (data.get("consent") !== "yes") nextErrors.consent = copy.consentError;
    return nextErrors;
  }

  function validateOne(form: HTMLFormElement, field: FieldName) {
    const next = validate(form);
    setErrors((current) => ({ ...current, [field]: next[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const data = new FormData(form);
    if (data.get("bot-field")) return;
    setSubmission("sending");
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Array.from(data.entries()) as Array<[string, string]>).toString(),
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setSubmission("success");
    } catch {
      setSubmission("error");
    }
  }

  if (submission === "success") {
    return (
      <div className="lead-form-success" role="status" tabIndex={-1} ref={successRef}>
        <span aria-hidden="true">✓</span>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successText}</p>
        <button type="button" onClick={() => setSubmission("idle")}>{copy.again}</button>
      </div>
    );
  }

  const disabled = submission === "sending";
  return (
    <form
      className="commercial-lead-form"
      name="exwest-commercial-inquiry"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="exwest-commercial-inquiry" />
      <p className="form-honeypot"><label>Do not fill this field<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="lead-form-grid">
        <FormField label={copy.name} name="fullName" error={errors.fullName} onBlur={(form) => validateOne(form, "fullName")} disabled={disabled} autoComplete="name" />
        <FormField label={copy.company} name="company" error={errors.company} onBlur={(form) => validateOne(form, "company")} disabled={disabled} autoComplete="organization" />
        <FormField label={copy.email} name="email" type="email" error={errors.email} onBlur={(form) => validateOne(form, "email")} disabled={disabled} autoComplete="email" inputMode="email" />
        <FormField label={`${copy.phone} · ${copy.optional}`} name="phone" type="tel" disabled={disabled} autoComplete="tel" inputMode="tel" />
        <label className="form-field form-field-wide">
          <span>{copy.interest}</span>
          <select name="interest" defaultValue="" disabled={disabled} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? "interest-error" : undefined} onBlur={(event) => validateOne(event.currentTarget.form!, "interest")}>
            <option value="" disabled>{copy.select}</option>
            {copy.interests.map((interest) => <option key={interest} value={interest}>{interestLabels[interest] ?? interest}</option>)}
          </select>
          {errors.interest ? <small id="interest-error" className="field-error">{errors.interest}</small> : null}
        </label>
        <label className="form-field form-field-wide">
          <span>{copy.message} · {copy.optional}</span>
          <textarea name="message" rows={4} disabled={disabled} autoComplete="off" />
        </label>
      </div>
      <label className="consent-field">
        <input type="checkbox" name="consent" value="yes" disabled={disabled} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} onBlur={(event) => validateOne(event.currentTarget.form!, "consent")} />
        <span>{copy.consent} <Link href={privacyPath}>{copy.privacy}</Link></span>
      </label>
      {errors.consent ? <small id="consent-error" className="field-error consent-error">{errors.consent}</small> : null}
      {submission === "error" ? <p className="form-submit-error" role="alert">{copy.error}</p> : null}
      <button className="button primary lead-submit" type="submit" disabled={disabled}>
        {disabled ? copy.sending : copy.submit}<span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function FormField({ label, name, type = "text", error, onBlur, ...props }: {
  label: string;
  name: FieldName | "phone";
  type?: "text" | "email" | "tel";
  error?: string;
  onBlur?: (form: HTMLFormElement) => void;
  disabled: boolean;
  autoComplete: string;
  inputMode?: "email" | "tel";
}) {
  const errorId = `${name}-error`;
  return (
    <label className="form-field">
      <span>{label}</span>
      <input {...props} name={name} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} onBlur={(event) => onBlur?.(event.currentTarget.form!)} />
      {error ? <small id={errorId} className="field-error">{error}</small> : null}
    </label>
  );
}
