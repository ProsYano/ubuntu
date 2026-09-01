import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Get In Touch With Our Expert Agents",
  description: "Contact RentX — Phone, Email, Location. Get In Touch With Our Expert Agents. Quick Links, Services, Newsletter.",
  path: "/contact",
});

export default function ContactPage() {
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
              <span className="text-white">Contact Us</span>
            </div>
            <h1 className="text-white mt-2" style={{ fontFamily: "var(--font-schibsted)" }}>
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Get In Touch With Our Expert Agents */}
      <section className="py-14 bg-white">
        <div className="e-con">
          <div>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Get In Touch With Our Expert Agents
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Tell us about your project and equipment requirements. Our team will help you find the right machinery and rental solution.
              </p>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="space-y-4">
                <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_rgba(0,0,0,0.05)] p-5 flex gap-4 items-center bg-white">
                  <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
                      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Phone Number
                    </p>
                    <a href="tel:+12025550143" className="text-[var(--e-global-color-text)] hover:text-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      +1 (202) 555-0143
                    </a>
                  </div>
                </div>
                <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_rgba(0,0,0,0.05)] p-5 flex gap-4 items-center bg-white">
                  <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M4 4h16v16H4z" />
                      <path d="M4 8l8 5 8-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Email
                    </p>
                    <a href="mailto:info@yourdomain.com" className="text-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      info@yourdomain.com
                    </a>
                  </div>
                </div>
                <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_rgba(0,0,0,0.05)] p-5 flex gap-4 items-center bg-white">
                  <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Address
                    </p>
                    <p className="text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                      100 Broadway, New York, USA
                    </p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-[15px] overflow-hidden shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] border border-[var(--e-global-color-837ff2c)] h-[240px] bg-[var(--e-global-color-b4c3f3a)] flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-[var(--e-global-color-secondary)] font-semibold" style={{ fontFamily: "var(--font-schibsted)" }}>
                      100 Broadway, New York, USA
                    </p>
                    <p className="text-[14px] text-[var(--e-global-color-text)] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                      Map — Google Maps embed (placeholder)
                    </p>
                    <a href="https://maps.google.com/?q=100+Broadway+New+York" target="_blank" className="mt-3 inline-flex items-center gap-2 text-[var(--e-global-color-accent)] font-medium">
                      Open in Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_rgba(0,0,0,0.15)] p-6 space-y-4 bg-white">
                <div className="grid md:grid-cols-2 gap-4">
                  <input placeholder="Name" required className="rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)] text-[16px]" style={{ fontFamily: "var(--font-poppins)" }} />
                  <input placeholder="Email" type="email" required className="rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)] text-[16px]" style={{ fontFamily: "var(--font-poppins)" }} />
                </div>
                <input placeholder="Subject" className="w-full rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)] text-[16px]" style={{ fontFamily: "var(--font-poppins)" }} />
                <textarea placeholder="Message" rows={5} className="w-full rounded-[20px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)] text-[16px]" style={{ fontFamily: "var(--font-poppins)" }} />
                <button type="submit" className="w-full bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
