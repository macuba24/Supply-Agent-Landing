"use client";

export type LandingLocale = "de" | "en" | "fr" | "es" | "pt" | "it" | "ko" | "zh";

const SUPPORTED_LOCALES: LandingLocale[] = ["de", "en", "es"];

const LABELS: Record<LandingLocale, { code: string }> = {
  de: { code: "DE" },
  en: { code: "EN" },
  fr: { code: "FR" },
  es: { code: "ES" },
  pt: { code: "PT" },
  it: { code: "IT" },
  ko: { code: "KO" },
  zh: { code: "ZH" },
};

function FlagIcon({ locale }: { locale: LandingLocale }) {
  if (locale === "de") {
    return (
      <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm border border-white/20 align-middle">
        <span className="h-full w-1/3 bg-black" />
        <span className="h-full w-1/3 bg-red-600" />
        <span className="h-full w-1/3 bg-amber-300" />
      </span>
    );
  }
  if (locale === "fr") {
    return (
      <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm border border-white/20 align-middle">
        <span className="h-full w-1/3 bg-blue-600" />
        <span className="h-full w-1/3 bg-white" />
        <span className="h-full w-1/3 bg-red-600" />
      </span>
    );
  }
  if (locale === "es") {
    return (
      <span className="inline-flex h-3.5 w-5 shrink-0 flex-col overflow-hidden rounded-sm border border-white/20 align-middle">
        <span className="h-1/4 w-full bg-red-600" />
        <span className="h-2/4 w-full bg-amber-300" />
        <span className="h-1/4 w-full bg-red-600" />
      </span>
    );
  }
  if (locale === "pt") {
    return (
      <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm border border-white/20 align-middle">
        <span className="h-full w-2/5 bg-emerald-600" />
        <span className="h-full w-3/5 bg-red-600" />
      </span>
    );
  }
  if (locale === "it") {
    return (
      <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm border border-white/20 align-middle">
        <span className="h-full w-1/3 bg-emerald-600" />
        <span className="h-full w-1/3 bg-white" />
        <span className="h-full w-1/3 bg-red-600" />
      </span>
    );
  }
  if (locale === "ko") {
    return (
      <span className="relative inline-flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-white align-middle">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="absolute bottom-[3px] right-[6px] h-2 w-2 rounded-full bg-blue-500 opacity-90" />
      </span>
    );
  }
  if (locale === "zh") {
    return (
      <span className="relative inline-flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-red-600 align-middle">
        <span className="absolute left-[3px] top-[3px] h-1.5 w-1.5 rounded-full bg-amber-300" />
      </span>
    );
  }
  return (
    <span className="relative inline-flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-blue-700 align-middle">
      <span className="absolute h-[2px] w-full bg-white/90" />
      <span className="absolute h-full w-[2px] bg-white/90" />
      <span className="h-[2px] w-full rotate-45 bg-red-400/90" />
      <span className="absolute h-[2px] w-full -rotate-45 bg-red-400/90" />
    </span>
  );
}

export function LanguageSwitcher({
  currentLocale,
  onChange,
}: {
  currentLocale: LandingLocale;
  onChange: (nextLocale: LandingLocale) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-full border border-slate-600 bg-slate-950/70 p-0.5 text-[11px] sm:gap-1 sm:p-1 sm:text-xs">
      {SUPPORTED_LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => onChange(locale)}
            className={`inline-flex h-6 items-center rounded-full px-1.5 transition sm:h-7 sm:px-2 ${
              isActive ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center gap-1 leading-none">
              <FlagIcon locale={locale} />
              <span className="relative top-[0.5px] font-medium">{LABELS[locale].code}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
