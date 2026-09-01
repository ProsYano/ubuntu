import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "FAQs",
  description: "RentX FAQs — Answers to common questions about equipment rental, transport, pricing.",
  path: "/faq",
});

const faqs = [
  { q: "What types of equipment do you offer for rent?", a: "We provide a wide range of construction machinery, including excavators, loaders, bulldozers, backhoe loaders, and dump trucks — all well-maintained and ready." },
  { q: "Is an operator included with the equipment?", a: "Operator can be included on request. We provide certified operators for all heavy machinery with training included." },
  { q: "How is the rental cost calculated?", a: "Rental cost is calculated per day, week or month. We offer flexible short and long-term plans tailored to your project, with transparent pricing." },
  { q: "Is maintenance included during the rental period?", a: "Yes — comprehensive on-site servicing and rapid repairs to keep your machinery running at peak performance are included." },
  { q: "Do you provide delivery and pickup service?", a: "Yes — Heavy Machinery Transported Safely, On Time, Every Time. GPS-tracked, insured, 24/7 support." },
  { q: "What happens if the equipment breaks down?", a: "We provide rapid on-site maintenance and replacement. Our dedicated specialists provide round-the-clock guidance and swift on-site assistance." },
  { q: "Do you offer emergency rental services?", a: "Yes — 24hr equipment delivery available for urgent projects. Contact us and we’ll arrange immediate dispatch." },
  { q: "How can I request a quote?", a: "Tell us your project requirements, rental period, and delivery location via our contact form or phone +1 (202) 555-0143 — we’ll respond within hours." },
];

export default function FAQPage() {
  return (
    <div>
      <section className="bg-[var(--e-global-color-a3006c7)] text-white pt-[140px] pb-12">
        <div className="e-con">
          <div>
            <div className="flex items-center gap-2 text-white/70 text-[14px]" style={{ fontFamily: "var(--font-poppins)" }}>
              <Link href="/" className="text-white hover:text-[var(--e-global-color-accent)]">
                Home
              </Link>
              <span>›</span>
              <span className="text-white">FAQs</span>
            </div>
            <h1 className="text-white mt-2" style={{ fontFamily: "var(--font-schibsted)" }}>
              FAQs
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="e-con max-w-3xl">
          <div>
            <p className="text-center text-[var(--e-global-color-text)] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-poppins)" }}>
              Find answers to the most common questions about our equipment, rental terms, delivery and support. Still need help? Contact our expert agents.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <details className="group rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] bg-white open:bg-[var(--e-global-color-a3006c7)] open:text-white transition-all duration-400">
                  <summary className="list-none flex items-center justify-between p-[14px_30px] cursor-pointer font-semibold text-[var(--e-global-color-secondary)] group-open:text-white" style={{ fontFamily: "var(--font-schibsted)" }}>
                    <span>{f.q}</span>
                    <span className="ml-4 text-[var(--e-global-color-accent)] group-open:text-white group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-[30px] pb-4 text-white/90 text-[16px] leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)" }}>
                    {f.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
          <div>
            <div className="mt-10 text-center rounded-[15px] bg-[var(--e-global-color-b4c3f3a)] p-6 border border-[var(--e-global-color-837ff2c)]">
              <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Still have questions?
              </h3>
              <p className="mt-2 text-[14px] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Get in touch with our expert agents — we’re ready to help.
              </p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
