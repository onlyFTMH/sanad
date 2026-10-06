/** Header, footer and landing page of the new interface design (matcha, almond, carob). */
import { landingFor } from '../i18n/landing';
import { signOut, useSession } from '../lib/auth';
import { usePrefs } from '../lib/prefs';
import { Globe } from '../ui/icons';

const Logo = ({ className }: { className?: string }) => (
  <picture>
    <source srcSet="/brand/sanad-logo-small.webp 1x, /brand/sanad-logo@2x.webp 2x" type="image/webp" />
    <img className={className} src="/brand/sanad-logo.png" srcSet="/brand/sanad-logo.png 1x, /brand/sanad-logo@2x.png 2x" alt="Sanad · سَنَد" />
  </picture>
);

export function SiteHeader({ active, onSettings }: { active: 'home' | 'ask' | 'my'; onSettings(): void }) {
  const { t, ui } = usePrefs();
  const l = landingFor(ui);
  const { session } = useSession();
  const link = (key: typeof active, href: string, label: string) => (
    <a href={href} className={active === key ? 'active' : undefined} aria-current={active === key ? 'page' : undefined}>{label}</a>
  );
  return (
    <>
      <div className="top-message">{l.topMessage}</div>
      <header className="navbar">
        <a href="#/" className="logo" aria-label="Sanad"><Logo /></a>
        <nav className="nav-links" aria-label="Sanad">
          {link('home', '#/', l.navHome)}
          {link('ask', '#/ask', l.navAsk)}
          {link('my', '#/my', t.myQ)}
        </nav>
        <div className="nav-end">
          <button className="language-button" type="button" onClick={onSettings} aria-label={l.chooseLanguage}>
            <Globe width={18} />
            <span className="language-current">{ui.toUpperCase()}</span>
          </button>
          {session ? (
            <button className="btn btn-secondary btn-sm" onClick={() => void signOut()}>{t.signOut}</button>
          ) : (
            <a className="btn btn-secondary btn-sm" href="#/my">{t.signIn}</a>
          )}
        </div>
      </header>
      <div className="brown-bar" />
    </>
  );
}

export function SiteFooter() {
  const { ui, t } = usePrefs();
  const l = landingFor(ui);
  return (
    <footer className="footer">
      <div className="container">
        <h3>Sanad | سَنَد</h3>
        <p>{l.footerText}</p>
        <p className="footer-note">{t.disclaimer}</p>
        <div className="footer-bottom">{l.footerRights}</div>
      </div>
    </footer>
  );
}

export function Landing() {
  const { t, ui } = usePrefs();
  const l = landingFor(ui);
  return (
    <div className="landing">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge-pill">{l.heroBadge}</span>
            <h1>
              {l.heroTitle}
              <span>{l.heroTitle2}</span>
            </h1>
            <p className="hero-description">{l.heroText}</p>
            <div className="actions">
              <a href="#/ask" className="btn btn-primary">
                {l.startQuestion} <span className="arrow flip" aria-hidden="true">→</span>
              </a>
              <a href="#/my" className="btn btn-secondary">{t.myQ}</a>
            </div>
            <p className="trust-line">{l.trustLine}</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="sanad-logo-large">
              <div className="logo-glow" />
              <Logo />
            </div>
            <div className="floating-card floating-card-one"><span>✓</span>{l.trustedSource}</div>
            <div className="floating-card floating-card-two"><span>◉</span>{l.yourLanguage}</div>
          </div>
        </div>
      </section>

      <section className="why-sanad">
        <div className="container">
          <div className="section-heading center">
            <span className="section-label">{l.whyLabel}</span>
            <h2>{l.whyTitle}</h2>
            <p>{l.whyText}</p>
          </div>
          <div className="feature-grid">
            {l.features.map(([title, text], i) => (
              <article key={title} className={'feature-card' + (i === 1 ? ' featured' : '')}>
                <div className="feature-icon">{String(i + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <div className="section-heading center">
            <span className="section-label">{l.journeyLabel}</span>
            <h2>{l.journeyTitle}</h2>
            <p>{l.journeyText}</p>
          </div>
          <ol className="journey">
            {l.journey.map(([title, text], i) => (
              <li key={title} className="journey-step">
                <div className="journey-number">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container transparency">
        <div className="transparency-content">
          <div className="section-heading">
            <span className="section-label">{l.sourcesLabel}</span>
            <h2>{l.sourcesTitle}</h2>
          </div>
          <p>{l.sourcesText}</p>
        </div>
        <div className="source-preview">
          <div className="source-preview-header">
            <div className="verified-dot">✓</div>
            <div>
              <strong>{l.verifiedContent}</strong>
              <small>{l.trustedReference}</small>
            </div>
          </div>
          <div className="source-preview-row"><span>{l.sourceLbl}</span><strong>{l.sourceVal}</strong></div>
          <div className="source-preview-row"><span>{l.referenceLbl}</span><strong>{l.referenceVal}</strong></div>
          <div className="source-preview-row"><span>{l.gradeLbl}</span><strong>{l.gradeVal}</strong></div>
          <div className="source-status">{l.sourceStatus}</div>
        </div>
      </section>

      <section className="responsible-section">
        <div className="container responsible-card">
          <div className="responsible-icon">AI</div>
          <div>
            <h2>{l.aiTitle}</h2>
            <p>{l.aiText}</p>
          </div>
          <a href="#/ask" className="btn btn-primary">{l.askNow}</a>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <span className="section-label">{l.ctaLabel}</span>
          <h2>{l.ctaTitle}</h2>
          <p>{l.ctaText}</p>
          <a href="#/ask" className="btn btn-primary">
            {l.startQuestion} <span className="arrow flip" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
