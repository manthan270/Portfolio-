import { portfolioData } from '../data/portfolioData';

export default function Privacy() {
  return (
    <article className="px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Last updated November 24, 2026
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Privacy</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          This is a personal portfolio. It does not provide user accounts, a contact form,
          payments, or file uploads.
        </p>
      </header>

      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Analytics and performance</h2>
          <p>
            The site uses Vercel Web Analytics for page views and Speed Insights for
            performance measurements. Vercel describes Web Analytics as cookie-free and says
            its visitor hash expires after 24 hours. Other handling and retention depend on
            Vercel&apos;s service and account settings. Read the{' '}
            <a className="underline underline-offset-2" href="https://vercel.com/docs/analytics/privacy-policy">
              Vercel Analytics privacy information
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Fonts</h2>
          <p>
            The site requests font stylesheets and font files from Google Fonts. Your browser
            connects to Google to load them. See{' '}
            <a className="underline underline-offset-2" href="https://policies.google.com/privacy">
              Google&apos;s Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Browser preferences</h2>
          <p>
            The selected color theme is stored in your browser&apos;s local storage. The intro
            animation dismissal is stored in session storage. The app uses these values as
            browser preferences; it does not send them to an application API.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Contact and public files</h2>
          <p>
            Email links open your configured email handler, and the meeting link opens
            Cal.com. This site does not receive contact form submissions. If you book a
            meeting, Cal.com handles the
            booking details under its{' '}
            <a className="underline underline-offset-2" href="https://website.cal.com/privacy">
              Privacy Policy
            </a>. The resume and certificates linked here are public files. For a privacy
            question, email{' '}
            <a className="underline underline-offset-2" href={`mailto:${portfolioData.contact.email}`}>
              {portfolioData.contact.email}
            </a>.
          </p>
        </section>

        <p className="border-t border-border/60 pt-5 text-xs">
          This notice summarizes the behavior visible in the site code. Review it against the
          active hosting and analytics settings, and update it if the site adds forms,
          accounts, or other data collection.
        </p>
      </div>
    </article>
  );
}
