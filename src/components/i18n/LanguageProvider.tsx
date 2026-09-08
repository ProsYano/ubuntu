"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, translate } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ["placeholder", "aria-label", "title", "alt"];

function localizeTree(root: Node, locale: Locale) {
  const translateNode = (node: Text) => {
    const original = originalText.get(node) ?? node.data;
    if (!originalText.has(node)) originalText.set(node, original);
    const trimmed = original.trim();
    const localized = translate(trimmed, locale);
    if (localized !== trimmed) node.data = original.replace(trimmed, localized);
    else if (locale === "en") node.data = original;
  };

  if (root.nodeType === Node.TEXT_NODE) translateNode(root as Text);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) translateNode(walker.currentNode as Text);

  const elements = root instanceof Element ? [root, ...root.querySelectorAll("*")] : [];
  for (const element of elements) {
    let originals = originalAttributes.get(element);
    for (const attribute of translatedAttributes) {
      if (!element.hasAttribute(attribute)) continue;
      originals ??= new Map<string, string>();
      if (!originals.has(attribute)) originals.set(attribute, element.getAttribute(attribute) ?? "");
      const original = originals.get(attribute) ?? "";
      element.setAttribute(attribute, translate(original, locale));
    }
    if (originals) originalAttributes.set(element, originals);
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("rentx-locale");
    const timer = window.setTimeout(() => {
      if (saved === "fr" || saved === "en") updateLocale(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("rentx-locale", locale);
    localizeTree(document.body, locale);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => localizeTree(node, locale));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => updateLocale(nextLocale), []);
  const value = useMemo(
    () => ({ locale, setLocale, t: (text: string) => translate(text, locale) }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
