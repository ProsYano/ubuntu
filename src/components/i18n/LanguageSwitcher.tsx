"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border ${mobile ? "border-[#025466]/20 bg-[#fff5ed] p-1" : "border-white/30 bg-white/10 p-1"}`}
      role="group"
      aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}
    >
      {(["fr", "en"] as const).map((item) => {
        const active = locale === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={`min-w-9 rounded-full px-2 py-1 text-[12px] font-semibold uppercase transition-colors ${
              active
                ? "bg-[#ff8414] text-white"
                : mobile
                  ? "text-[#025466] hover:text-[#ff8414]"
                  : "text-white hover:text-[#ffb36f]"
            }`}
            aria-pressed={active}
            aria-label={item === "fr" ? "Français" : "English"}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
