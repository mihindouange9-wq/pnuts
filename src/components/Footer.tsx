import { useLang } from "../i18n";
import { site } from "../data/site";
import { Icon, Peanut, Wordmark } from "./Peanut";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const configured = site.social.filter((s) => s.url);

  return (
    <footer className="footer seam" style={{ "--seam-color": "var(--cream)" } as React.CSSProperties} aria-labelledby="footer-title">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h2 id="footer-title" className="sr-only">
              P’NUTS
            </h2>
            <Wordmark />
            <p className="footer__statement">{t.footer.statement}</p>
            <span className="sticker sticker--orange" style={{ justifySelf: "start", "--tilt": "-2deg" } as React.CSSProperties}>
              Bold taste. Real crunch.
            </span>
          </div>
          <nav className="footer__col" aria-label={t.footer.explore}>
            <h2>{t.footer.explore}</h2>
            <ul>
              <li>
                <a href="#flavors">{t.nav.products}</a>
              </li>
              <li>
                <a href="#story">{t.nav.story}</a>
              </li>
              <li>
                <a href="#find">{t.nav.find}</a>
              </li>
              <li>
                <a href="#contact">{t.nav.contact}</a>
              </li>
              {configured.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer__col">
            <h2>{t.footer.legal}</h2>
            <div className="footer__legal">
              <details className="legal" id="privacy">
                <summary>{t.footer.privacy}</summary>
                <p>{t.footer.privacyText}</p>
              </details>
              <details className="legal" id="terms">
                <summary>{t.footer.terms}</summary>
                <p>{t.footer.termsText}</p>
              </details>
            </div>
          </div>
        </div>
        <div className="footer__partner">
          <span className="footer__partner-label">{t.footer.partnerLabel}</span>
          <a className="footer__partner-link" href={site.partner.url} target="_blank" rel="noopener noreferrer" aria-label={`${site.partner.name} (${t.footer.partnerNewTab})`}>
            <img className="footer__partner-logo" src={site.partner.logo} alt={site.partner.name} width="800" height="246" loading="lazy" decoding="async" />
          </a>
          <span className="footer__partner-note">{t.footer.partnerNote}</span>
        </div>
        <div className="footer__bottom">
          <span>
            © {year} P’NUTS. {t.footer.rights}
          </span>
          <Peanut />
          <a className="footer__top-link" href="#top">
            {t.footer.top}
            <Icon.Up />
          </a>
        </div>
        <div className="footer__wordmark-row" aria-hidden="true">
          <Wordmark />
        </div>
      </div>
    </footer>
  );
}
