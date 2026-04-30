"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Locale = "de" | "en" | "es";
type ProductKey = "flow" | "supply";

type ProductCopy = {
  tabLabel: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  kpis: Array<{ label: string; value: string }>;
};

type RoiModule = {
  kicker: string;
  title: string;
  subtitle: string;
  headers: { current: string; withAgent: string };
  rows: Array<{ current: string; withAgent: string }>;
  primaryCta: string;
  secondaryCta: string;
};

type LocaleCopy = {
  languageLabel: string;
  requestDemo: string;
  suiteLabel: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  globalPromise: string;
  primaryCta: string;
  marketTitle: string;
  marketSubtitle: string;
  marketBullets: string[];
  marketQuote: string;
  focusTitle: string;
  focusText: string;
  hardImpact: {
    title: string;
    content: string;
    indicators: Array<{ level: string; detail: string }>;
  };
  fieldReports: {
    title: string;
    principle: string;
    cases: Array<{ title: string; body: string }>;
  };
  founder: {
    kicker: string;
    title: string;
    body: string;
    usp: string;
  };
  roiModule: RoiModule | null;
  flow: ProductCopy;
  supply: ProductCopy;
  contactEmail: string;
};

const locales: Locale[] = ["de", "en", "es"];
const localePathByKey: Record<Locale, string> = {
  de: "/locales/de/common.json",
  en: "/locales/en/common.json",
  es: "/locales/es/common.json",
};

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "de";
    }
    const raw = new URLSearchParams(window.location.search).get("lang");
    return raw && locales.includes(raw as Locale) ? (raw as Locale) : "de";
  });
  const [activeProduct, setActiveProduct] = useState<ProductKey>("flow");
  const [copy, setCopy] = useState<LocaleCopy | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("lang");
    if (!raw || !locales.includes(raw as Locale)) {
      params.set("lang", locale);
      window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
    }
  }, [locale, pathname]);

  useEffect(() => {
    let isCancelled = false;

    const loadLocaleCopy = async () => {
      const response = await fetch(localePathByKey[locale], { cache: "no-store" });
      if (!response.ok) {
        return;
      }
      const nextCopy = (await response.json()) as LocaleCopy;
      if (!isCancelled) {
        setCopy(nextCopy);
      }
    };

    loadLocaleCopy();
    return () => {
      isCancelled = true;
    };
  }, [locale]);

  if (!copy) {
    return null;
  }

  const t = copy;
  const activeProductCopy = t[activeProduct];

  const changeLocale = (nextLocale: Locale) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    router.replace(`${pathname}?${params.toString()}`);
    setLocale(nextLocale);
  };

  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.18),_transparent_40%),radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_34%)] px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-lg font-semibold tracking-wide text-cyan-200">{t.suiteLabel}</p>

            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 p-1">
              <button
                type="button"
                onClick={() => setActiveProduct("flow")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeProduct === "flow"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                🛰️ {t.flow.tabLabel}
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct("supply")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeProduct === "supply"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                🤖 {t.supply.tabLabel}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-lg border border-slate-700 bg-slate-950/70 p-1">
                {locales.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLocale(lang)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                      locale === lang ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <a
                href="#request-demo"
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {t.requestDemo}
              </a>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-red-500/35 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">{t.heroKicker}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-4xl text-base font-medium text-slate-200">{t.heroSubtitle}</p>
          <p className="mt-4 inline-flex rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
            {t.globalPromise}
          </p>
        </section>

        <section className="rounded-3xl border border-red-500/40 bg-slate-900/90 p-7 shadow-2xl">
          <h2 className="text-2xl font-black text-white md:text-3xl">{t.hardImpact.title}</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-200">{t.hardImpact.content}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {t.hardImpact.indicators.map((indicator, index) => (
              <div
                key={`${indicator.level}-${index}`}
                className={`rounded-xl border p-3 ${
                  index === 0
                    ? "border-red-500/60 bg-red-500/15"
                    : index === 1
                      ? "border-amber-500/60 bg-amber-500/15"
                      : "border-emerald-500/60 bg-emerald-500/15"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">{indicator.level}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{indicator.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-500/35 bg-slate-900/90 p-7 shadow-xl">
          <h2 className="text-2xl font-black text-white md:text-3xl">{t.fieldReports.title}</h2>
          <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-100">
            {t.fieldReports.principle}
          </p>
          <div className="mt-5 grid gap-4">
            {t.fieldReports.cases.map((caseItem, index) => (
              <article key={`${caseItem.title}-${index}`} className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-300">{caseItem.title}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{caseItem.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-500/30 bg-slate-900/85 p-7 shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-indigo-300">{t.founder.kicker}</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{t.founder.title}</h2>
          <p className="mt-3 text-sm text-slate-300">{t.founder.body}</p>
          <p className="mt-4 rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-100">
            {t.founder.usp}
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-700 bg-slate-900/80 p-7 shadow-xl">
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">{activeProductCopy.tag}</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{activeProductCopy.title}</h2>
            <p className="mt-3 text-sm text-slate-300">{activeProductCopy.description}</p>

            <div className="mt-5 grid gap-2">
              {activeProductCopy.highlights.map((item) => (
                <p key={item} className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
                  - {item}
                </p>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {activeProductCopy.kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-cyan-200">{kpi.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{kpi.value}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl border border-indigo-500/30 bg-slate-900/85 p-7 shadow-xl">
            <h3 className="text-lg font-semibold text-indigo-100">{t.marketTitle}</h3>
            <p className="mt-2 text-sm text-slate-300">{t.marketSubtitle}</p>
            <div className="mt-4 grid gap-2">
              {t.marketBullets.map((bullet) => (
                <p key={bullet} className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
                  - {bullet}
                </p>
              ))}
            </div>
            <p className="mt-5 rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-100">
              {t.marketQuote}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-slate-400">
              {t.focusTitle}
            </p>
            <p className="mt-1 text-sm text-slate-300">{t.focusText}</p>
          </aside>
        </section>

        {locale === "en" && t.roiModule ? (
          <section className="rounded-3xl border border-emerald-500/35 bg-slate-900/85 p-7 shadow-xl">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">{t.roiModule.kicker}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{t.roiModule.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{t.roiModule.subtitle}</p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-950/80 text-left text-slate-200">
                  <tr>
                    <th className="px-3 py-2">{t.roiModule.headers.current}</th>
                    <th className="px-3 py-2">{t.roiModule.headers.withAgent}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.roiModule.rows.map((row) => (
                    <tr key={row.current} className="border-t border-slate-800">
                      <td className="px-3 py-2 text-slate-300">{row.current}</td>
                      <td className="px-3 py-2 font-semibold text-emerald-300">{row.withAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#request-demo"
                className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                {t.roiModule.primaryCta}
              </a>
              <a
                href="#request-demo"
                className="rounded-lg border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
              >
                {t.roiModule.secondaryCta}
              </a>
            </div>
          </section>
        ) : null}

        <section id="request-demo" className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 text-center">
          <p className="text-sm text-slate-300">{t.languageLabel}</p>
          <h4 className="mt-2 text-xl font-semibold">{t.primaryCta}</h4>
          <p className="mt-2 text-sm text-slate-400">{t.contactEmail}</p>
        </section>
      </section>
    </main>
  );
}
