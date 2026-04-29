type SearchParams = Record<string, string | string[] | undefined>;

function pickLang(value: string | string[] | undefined): "de" | "en" {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "de" ? "de" : "en";
}

const copy = {
  de: {
    title: "Technical Integration Sheet",
    subtitle:
      "SAP-Integration fuer IT-Leiter: sicher, bidirektional und ohne Eingriff in Kern-Tabellen.",
    bullets: [
      "OAuth 2.0 fuer abgesicherte API-Authentifizierung",
      "TLS/SSL Verschluesselung fuer alle Datenuebertragungen",
      "OData und Custom API Support fuer SAP S/4HANA",
      "Zero Data Retention Option fuer sensible Prozesse",
      "Read-first Architektur: keine Pflicht fuer Schreibrechte auf Kern-Tabellen",
    ],
    back: "Zurueck zur Landingpage",
  },
  en: {
    title: "Technical Integration Sheet",
    subtitle:
      "SAP integration for IT leads: secure, bidirectional, and designed without intrusive core-table access.",
    bullets: [
      "OAuth 2.0 for secure API authentication",
      "TLS/SSL encryption for all data transport",
      "OData and custom API support for SAP S/4HANA",
      "Zero Data Retention option for sensitive operations",
      "Read-first architecture: no mandatory write access to core tables",
    ],
    back: "Back to landing page",
  },
};

export default async function TechnicalIntegrationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const lang = pickLang(params.lang);
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <section className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/35 bg-slate-900/85 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-300">{t.subtitle}</p>
        <div className="mt-6 grid gap-3">
          {t.bullets.map((point) => (
            <p key={point} className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-cyan-100">
              - {point}
            </p>
          ))}
        </div>
        <a
          href={`/?lang=${lang}`}
          className="mt-6 inline-flex rounded-lg border border-cyan-400/60 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100"
        >
          {t.back}
        </a>
      </section>
    </main>
  );
}
