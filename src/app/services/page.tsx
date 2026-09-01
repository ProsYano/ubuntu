import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Equipment Transportation — Heavy Machinery Transported Safely",
  description: "Heavy Machinery Transported Safely, On Time, Every Time — Why Choose Our Equipment Transportation. RentX services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="bg-[var(--e-global-color-a3006c7)] text-white pt-[140px] pb-12">
        <div className="e-con">
          <div>
            <div className="flex items-center gap-2 text-white/70 text-[14px]" style={{ fontFamily: "var(--font-poppins)" }}>
              <Link href="/" className="text-white hover:text-[var(--e-global-color-accent)]">
                Home
              </Link>
              <span>›</span>
              <span className="text-white">Equipment Transportation</span>
            </div>
            <h1 className="text-white mt-2" style={{ fontFamily: "var(--font-schibsted)" }}>
              Equipment Transportation
            </h1>
          </div>
        </div>
      </section>

      {/* Content — two columns: left article + right sidebar */}
      <section className="py-14 bg-white">
        <div className="e-con grid lg:grid-cols-[0.7fr_1.3fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)] mb-4" style={{ fontFamily: "var(--font-schibsted)" }}>
                  All Services
                </h3>
                <ul className="space-y-2 m-0 list-none" style={{ fontFamily: "var(--font-poppins)" }}>
                  {[
                    { label: "Equipment Rental", active: false },
                    { label: "Heavy Equipment Rental", active: false },
                    { label: "Equipment Transportation", active: true },
                    { label: "Preventive Maintenance & Repair", active: false },
                    { label: "Spare Parts & Attachments Sales", active: false },
                  ].map((it) => (
                    <li key={it.label}>
                      <a
                        href="#"
                        className={`flex items-center justify-between px-4 py-3 rounded-[50px] text-[16px] font-medium transition-colors ${it.active ? "bg-[var(--e-global-color-accent)] text-white" : "bg-[var(--e-global-color-b4c3f3a)] text-[var(--e-global-color-text)] hover:bg-[var(--e-global-color-accent)] hover:text-white"}`}
                      >
                        {it.label}
                        <span>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="rounded-[15px] bg-[var(--e-global-color-a3006c7)] text-white p-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] border border-[var(--e-global-color-837ff2c)]">
                <h3 className="text-white text-[22px] font-semibold" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Get Started Today
                </h3>
                <p className="mt-2 text-white/90 text-[16px] leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-white hover:text-[var(--e-global-color-accent)] transition-all duration-400 w-full"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Contact us
                  <span className="w-7 h-7 rounded-full bg-white text-[var(--e-global-color-accent)] inline-flex items-center justify-center ml-2">↗</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">☎</span>
                  <div>
                    <p className="text-[14px] text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                      +58 585 857 5084
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">✉</span>
                  <p className="text-[14px] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    info@yourdomain.com
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">📍</span>
                  <p className="text-[14px] text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    4517 Washington Ave. Manchester,
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="space-y-6">
            <div>
              <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1100&auto=format&fit=crop" alt="Transport" className="w-full h-[380px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Heavy Machinery Transported Safely, On Time, Every Time
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>

            <div>
              <h3 className="text-[22px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Why Choose Our Equipment Transportation
              </h3>
              <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { t: "Safety First", d: "Certified drivers, secured loads, insurance included." },
                { t: "On-Time Guarantee", d: "We deliver when we say — every time." },
                { t: "All Terrains", d: "Urban, rural, off-road — we go everywhere." },
                { t: "24/7 Support", d: "Real-time tracking and human support." },
              ].map((f, i) => (
                <div key={f.t}>
                  <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-[var(--e-global-color-b4c3f3a)] h-full">
                    <h4 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                      {f.t}
                    </h4>
                    <p className="mt-2 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      {f.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
