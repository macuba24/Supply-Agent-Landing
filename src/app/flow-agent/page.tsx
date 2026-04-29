type SearchParams = Record<string, string | string[] | undefined>;

function resolveLang(value: string | string[] | undefined): "de" | "en" | "es" {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "de" || raw === "es") return raw;
  return "en";
}

const copy = {
  de: {
    title: "Flow Agent Landingpage",
    subtitle:
      "Live-Steuerung fuer kritischen Pfad, Engpassprognose und SAP-gestuetzte Produktionsentscheidungen.",
    points: [
      "Predicted Bottlenecks mit Risk Score",
      "Kritischer Pfad in Echtzeit statt SAP-Zeitversatz",
      "Compliance & Audit Trail mit CSV-Export",
    ],
    cta: "Flow Agent App oeffnen",
    back: "Zur Supply Agent Landingpage",
  },
  en: {
    title: "Flow Agent Landing Page",
    subtitle:
      "Live critical-path control, bottleneck prediction, and SAP-connected production decisions.",
    points: [
      "Predicted bottlenecks with risk score",
      "Real-time critical-path visibility",
      "Compliance and audit trail with CSV export",
    ],
    cta: "Open Flow Agent App",
    back: "Back to Supply Agent Landing Page",
  },
  es: {
    title: "Landingpage Flow Agent",
    subtitle:
      "Control en vivo del camino critico, prediccion de cuellos de botella y decisiones conectadas con SAP.",
    points: [
      "Predicted bottlenecks con risk score",
      "Visibilidad del camino critico en tiempo real",
      "Compliance y audit trail con export CSV",
    ],
    cta: "Abrir Flow Agent App",
    back: "Volver a Landingpage Supply Agent",
  },
} as const;

export default async function FlowAgentLandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const lang = resolveLang(params.lang);
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <section className="mx-auto max-w-4xl rounded-3xl border border-emerald-500/35 bg-slate-900/85 p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">Flow Agent</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{t.title}</h1>
        <p className="mt-3 text-sm text-slate-300">{t.subtitle}</p>
        <div className="mt-5 grid gap-2">
          {t.points.map((point) => (
            <p key={point} className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
              - {point}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://flow-agent-erp.vercel.app/tracking?lang=${lang}`}
            className="rounded-lg bg-emerald-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            {t.cta}
          </a>
          <a
            href={`/?lang=${lang}`}
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white"
          >
            {t.back}
          </a>
        </div>
      </section>
    </main>
  );
}
