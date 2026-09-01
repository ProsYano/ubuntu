import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "About Us — The Powerhouse Behind Your Infrastructure Projects",
  description:
    "Meet Our Team Of Dedicated Heavy Machinery Experts — THOMAS A. MILLER, BRADLEY COOPER, JOSHUA STEVENS. RentX complete solutions.",
  path: "/about",
});

const team = [
  { name: "THOMAS A. MILLER", role: "CHIEF EXECUTIVE OFFICER", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { name: "BRADLEY COOPER", role: "SENIOR PROJECT MANAGER", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { name: "JOSHUA STEVENS", role: "DIRECTOR OF OPERATIONS", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero banner — Services Details style */}
      <section className="bg-[var(--e-global-color-a3006c7)] text-white pt-[140px] pb-12">
        <div className="e-con">
          <div>
            <div className="flex items-center gap-2 text-white/70 text-[14px]" style={{ fontFamily: "var(--font-poppins)" }}>
              <Link href="/" className="text-white hover:text-[var(--e-global-color-accent)]">
                Home
              </Link>
              <span>›</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-white mt-2" style={{ fontFamily: "var(--font-schibsted)" }}>
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Powerhouse section — same as Home 7a8c5485 */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div>
                <div className="inline-flex items-center gap-2 text-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  <span className="w-8 h-8 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center text-[14px]">◆</span>
                  <span className="text-[14px] font-semibold tracking-widest uppercase">WHO WE ARE</span>
                </div>
              </div>
              <div>
                <h2 className="mt-3 text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  The Powerhouse Behind Your <span className="text-[var(--e-global-color-accent)]">Infrastructure Projects</span>
                </h2>
              </div>
              <div>
                <p className="mt-4 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  From construction sites to infrastructure projects, we provide dependable machinery and rental support built around your requirements.
                </p>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-[15px] rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4 bg-white">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">◎</span>
                    <div>
                      <p className="font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                        Our Mission
                      </p>
                      <p className="text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                        Delivering reliable heavy equipment solutions.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-[15px] rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4 bg-white">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-a3006c7)] text-white inline-flex items-center justify-center">◯</span>
                    <div>
                      <p className="font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                        Our Vision
                      </p>
                      <p className="text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                        Building a trusted infrastructure future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-6 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Trusted" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--e-global-color-secondary)] m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Trusted Partners
                    </p>
                    <p className="text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                      Trusted by leading construction and infrastructure companies worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] bg-[var(--e-global-color-b4c3f3a)]">
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop" alt="Excavator" className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-6 left-0 md:-left-6 bg-[var(--e-global-color-a3006c7)] text-white rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] p-4 sm:p-5 min-w-[180px] border border-[var(--e-global-color-837ff2c)]">
                  <div className="text-[36px] font-bold leading-none" style={{ fontFamily: "var(--font-schibsted)" }}>
                    20+
                  </div>
                  <div className="text-[14px] leading-[1.4em] mt-1 text-white/90" style={{ fontFamily: "var(--font-poppins)" }}>
                    Years Of Industry Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="max-w-[640px] mx-auto text-center">
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Meet Our Team Of Dedicated Heavy Machinery Experts
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Our team understands construction equipment and works closely with clients to provide solutions for every project.
              </p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={m.name}>
                <div className="rounded-[15px] overflow-hidden bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] border border-transparent">
                  <div className="overflow-hidden">
                    <img src={m.img} alt={m.name} className="w-full h-[300px] object-cover transition-all duration-400 hover:scale-[1.05]" loading="lazy" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-[18px] font-bold text-[var(--e-global-color-secondary)] tracking-wide" style={{ fontFamily: "var(--font-schibsted)" }}>
                      {m.name}
                    </h3>
                    <p className="text-[14px] font-medium text-[var(--e-global-color-accent)] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                      {m.role}
                    </p>
                    <div className="mt-3 flex justify-center gap-2">
                      <a href="#" aria-label="X-twitter" className="w-8 h-8 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center hover:bg-[var(--e-global-color-a3006c7)] transition-colors">
                        <svg width="12" height="12" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
                          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                      </a>
                      <a href="#" aria-label="Linkedin" className="w-8 h-8 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center hover:bg-[var(--e-global-color-a3006c7)] transition-colors">
                        <svg width="12" height="12" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Equipment Solutions */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con">
          <div>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Complete Equipment Solutions For Every Project Scale
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                From construction jobs to infrastructure, our equipment rental services are designed to keep your operations moving.
              </p>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { title: "Equipment Rental", desc: "Flexible short and long-term rental plans tailored precisely to fit your project timelines and equipment needs.", icon: "◆" },
              { title: "Equipment Maintenance", desc: "Comprehensive on-site servicing and rapid repairs to keep your machinery running at peak performance.", icon: "⬢" },
              { title: "Equipment Transportation", desc: "Safe, prompt delivery and hauling of heavy machinery directly to your designated job site.", icon: "⬣" },
            ].map((s, i) => (
              <div key={s.title}>
                <div className="bg-[var(--e-global-color-b4c3f3a)] rounded-[15px] p-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] border border-transparent h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center text-xl shrink-0">{s.icon}</div>
                  <h3 className="mt-4 text-[22px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)] flex-1" style={{ fontFamily: "var(--font-poppins)" }}>
                    {s.desc}
                  </p>
                  <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-[var(--e-global-color-accent)] font-medium hover:text-[var(--e-global-color-a3006c7)]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Read More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Feedback */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-0a33e2d)]">
        <div className="e-con">
          <div>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Real Feedback From Trusted Partners
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Contractors and project teams rely on our equipment, service, and support to keep demanding projects moving forward.
              </p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-[15px] p-6 shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)] bg-white border border-[var(--e-global-color-837ff2c)]">
                <div className="text-[var(--e-global-color-accent)]">★★★★★</div>
                <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  “The flexibility in their rental terms and the quick delivery of excavators and loaders saved our project schedule multiple times.”
                </p>
                <p className="mt-4 font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  — Project Manager, Infrastructure Co.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-[15px] p-6 shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)] bg-white border border-[var(--e-global-color-837ff2c)]">
                <div className="text-[var(--e-global-color-accent)]">★★★★★</div>
                <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  “What impresses us the most is their rapid on-site maintenance and technical support.”
                </p>
                <p className="mt-4 font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  — Operations Director, Mining Group
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-10 rounded-[15px] bg-[var(--e-global-color-a3006c7)] text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
              <div>
                <h3 className="text-white text-[22px] font-bold m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Trusted by 500+ VIP Clients Worldwide
                </h3>
                <p className="text-white/80 text-[14px] mt-1 m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                  Based on 200+ verified reviews • 4.9/5
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-[28px] font-bold leading-none" style={{ fontFamily: "var(--font-schibsted)" }}>
                    4.9/5
                  </div>
                  <div className="text-[12px] text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
                    Rating
                  </div>
                </div>
                <span className="w-px h-10 bg-[var(--e-global-color-837ff2c)]" aria-hidden />
                <div className="text-center">
                  <div className="text-[28px] font-bold leading-none" style={{ fontFamily: "var(--font-schibsted)" }}>
                    24hr
                  </div>
                  <div className="text-[12px] text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
                    EQUIPMENT DELIVERY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
