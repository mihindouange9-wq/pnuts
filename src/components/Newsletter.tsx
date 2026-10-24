import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { revealBlock, revealLines } from "../motion";
import { useLang } from "../i18n";
import { site } from "../data/site";
import { Icon } from "./Peanut";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "invalid" } | { kind: "success" } | { kind: "error" } | { kind: "info" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter : validation réelle, états clairs ; sans service branché, le formulaire le dit au lieu de simuler. */
export function Newsletter() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const id = useId();

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".newsletter__title")!);
      revealBlock(".newsletter__aside > *", root.current!);
    },
    { scope: root },
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setStatus({ kind: "invalid" });
      inputRef.current?.focus();
      return;
    }
    if (!site.newsletterEndpoint) {
      setStatus({ kind: "info" });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.newsletterEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value, lang }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "success" });
      setEmail("");
    } catch {
      setStatus({ kind: "error" });
    }
  };

  const message =
    status.kind === "invalid" ? t.newsletter.invalid : status.kind === "success" ? t.newsletter.success : status.kind === "error" ? t.newsletter.error : status.kind === "info" ? t.newsletter.notConnected : "";
  const tone = status.kind === "invalid" || status.kind === "error" ? "error" : status.kind === "success" ? "success" : "info";
  const configured = site.social.filter((s) => s.url);

  return (
    <section ref={root} id="contact" className="newsletter field field--cream seam" style={{ "--seam-color": "var(--orange)" } as React.CSSProperties} aria-labelledby="newsletter-title">
      <div className="container newsletter__grid">
        <div>
          <h2 id="newsletter-title" className="display newsletter__title lines" data-fit>
            {t.newsletter.title.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>
        <div className="newsletter__aside" style={{ display: "grid", gap: "var(--space-12)" }}>
          <form className="form" onSubmit={submit} noValidate>
            <p className="lead">{t.newsletter.text}</p>
            <label htmlFor={`${id}-email`} className="sr-only">
              {t.newsletter.label}
            </label>
            <div className={`form__row${status.kind === "invalid" ? " is-invalid" : ""}`}>
              <input
                ref={inputRef}
                id={`${id}-email`}
                className="form__input"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder={t.newsletter.placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.kind !== "idle") setStatus({ kind: "idle" });
                }}
                aria-invalid={status.kind === "invalid"}
                aria-describedby={`${id}-status ${id}-privacy`}
                required
              />
              <button type="submit" className="btn" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? t.newsletter.sending : t.newsletter.button}
                <Icon.Arrow />
              </button>
            </div>
            <p id={`${id}-status`} className={`form__status form__status--${tone}`} role="status" aria-live="polite">
              {message && (tone === "error" ? <Icon.Alert /> : tone === "success" ? <Icon.Check /> : <Icon.Info />)}
              {message}
            </p>
            <p id={`${id}-privacy`} className="form__privacy">
              {t.newsletter.privacy}
            </p>
          </form>

          <div className="social">
            <h3 className="social__title">{t.social.title}</h3>
            <ul className="social__list">
              {configured.length
                ? configured.map((s) => (
                    <li key={s.name}>
                      <a className="chip" href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name}
                      </a>
                    </li>
                  ))
                : site.social.map((s) => (
                    <li key={s.name} className="chip chip--soon">
                      {s.name} <small>{t.campaign.soon}</small>
                    </li>
                  ))}
            </ul>
            {!configured.length && <p className="form__privacy">{t.social.soon}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
