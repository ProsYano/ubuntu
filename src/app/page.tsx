import { Hero } from "@/components/sections/Hero";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

function ArrowIcon({ light = false }: { light?: boolean }) {
  return (
    <span className={`rentx-card-arrow ${light ? "rentx-card-arrow--light" : ""}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" /><path d="M8 7h9v9" />
      </svg>
    </span>
  );
}

function RatingStars() {
  return <div className="rentx-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <span key={index}>★</span>)}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="rentx-eyebrow"><span>◆</span>{children}</div>;
}

/* SEO Home — texte canonique §10 STYLES.md */
/* STYLES.md §1.1 #FF8414 accent #025466 petrol #000811 secondary | §2 Schibsted 68px 800 / 46px 700 Poppins 16px | §5 radius 50px/15px shadow 0 0 30 */
export const metadata: Metadata = buildMetadata({
  title: "Empowering Your Projects With Our Premium Machinery",
  description:
    "The Powerhouse Behind Your Infrastructure Projects — Powerful Machines. Built For Thought Projects. RentX location premium.",
  path: "/",
});

/* Shared data — 1000% texte canonique STYLES.md §10 */
const equipments = [
  {
    title: "Heavy Duty Wheel Loader",
    price: "$550 /Day",
    desc: "Versatile machines for high-capacity earthmoving, loading, and site clearing applications.",
    image: "/rentx-reference/asset-53c5f9104bbddcd2.png",
  },
  {
    title: "ZX350 Hydraulic Excavator",
    price: "$420 /Day",
    desc: "Compact yet powerful excavators built for demanding excavation and construction applications.",
    image: "/rentx-reference/asset-d42655080003ef46.png",
  },
  {
    title: "416F Backhoe Loader",
    price: "$380 /Day",
    desc: "A versatile machine combining digging, trenching, loading, and material handling capabilities.",
    image: "/rentx-reference/asset-653a3cda130dfca9.png",
  },
  {
    title: "Compact Wheel Loader",
    price: "$400 /Day",
    desc: "Versatile machines for digging, loading, trenching, and everyday construction work.",
    image: "/rentx-reference/asset-e7a5113e77f98233.png",
  },
  {
    title: "140 VC Motor Grader",
    price: "$500 /Day",
    desc: "Precision grading equipment designed for leveling, pushing, and fine-tuning challenging terrain.",
    image: "/rentx-reference/asset-63712c0423260b45.png",
  },
  {
    title: "745 Articulated Truck",
    price: "$600 /Day",
    desc: "Dependable hauling equipment for transporting soil, aggregates, debris, and construction materials.",
    image: "/rentx-reference/asset-9f998c4333fd8490.png",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* 7a8c5485 — The Powerhouse Behind Your Infrastructure Projects */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left */}
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

              {/* Mission / Vision — 3d5db527 fadeInRight / 3ea8a7f fadeInLeft */}
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-[15px] rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4 bg-white">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center text-xl">◎</span>
                    <div>
                      <p className="font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)", fontSize: "18px", fontWeight: 600, color: "#000811" }}>
                        Our Mission
                      </p>
                      <p className="text-[14px] leading-[1.5em] m-0" style={{ fontFamily: "var(--font-poppins)", color: "#181818" }}>
                        Delivering reliable heavy equipment solutions.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-[15px] rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4 bg-white">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-a3006c7)] text-white inline-flex items-center justify-center text-xl">◯</span>
                    <div>
                      <p className="font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)", fontSize: "18px", fontWeight: 600, color: "#000811" }}>
                        Our Vision
                      </p>
                      <p className="text-[14px] leading-[1.5em] m-0" style={{ fontFamily: "var(--font-poppins)", color: "#181818" }}>
                        Building a trusted infrastructure future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="/rentx-reference/asset-5d88ea46d454ea6c.webp"
                    alt="Trusted"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)", color: "#000811" }}>
                      Trusted Partners
                    </p>
                    <p className="text-[14px] leading-[1.5em] m-0" style={{ fontFamily: "var(--font-poppins)", color: "#181818" }}>
                      Trusted by leading construction and infrastructure companies worldwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trusted Partners logos grid — 50267b3d */}
              <div>
                <div className="mt-6 grid grid-cols-4 md:grid-cols-8 gap-3">
                  {["010a030a6205063b", "646217d27706044d", "81eb3c3deb74b287", "aff7a40ded018a65", "b8e5c8b3d1e35c37", "ca6d314f1f12dd2b"].map((logo) => (
                    <div key={logo} className="bg-white rounded-[8px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_15px_rgba(0,0,0,0.05)] p-3 flex items-center justify-center h-[48px]">
                      <img src={`/rentx-reference/asset-${logo}.png`} alt="Partner logo" className="max-h-[24px] w-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mt-6">
                  <Link href="/about" className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium text-[16px] hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                    More About us
                    <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center text-white ml-2">↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right image + counter */}
            <div>
              <div className="relative">
                <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] bg-[var(--e-global-color-b4c3f3a)]">
                  <img
                    src="/rentx-reference/asset-5812aa885dbd3625.webp"
                    alt="Excavator"
                    className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Counter badge 20+ Years */}
                <div className="absolute -bottom-6 left-0 md:left-[-20px] bg-[var(--e-global-color-a3006c7)] text-white rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] p-4 sm:p-5 min-w-[180px] border border-[var(--e-global-color-837ff2c)]">
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

      {/* 4b78990f — Powerful Machines. Built For Thought Projects. */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-[640px]">
                <Eyebrow>OUR EQUIPMENT</Eyebrow>
                <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Powerful Machines. Built For Thought Projects.
                </h2>
                <p className="mt-3 text-[var(--e-global-color-text)] text-[16px] leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Choose from a wide range of well-maintained heavy machinery designed to deliver dependable performance across job sites.
                </p>
              </div>
              <div className="shrink-0">
                <Link href="/equipments" className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                  View All
                  <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center">↗</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((it, i) => (
              <div key={it.title}>
                <a href="/equipments" className="group block h-full rentx-equipment-link">
                  <article className="rentx-equipment-card h-full flex flex-col">
                    <div className="relative overflow-hidden rentx-equipment-media">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-[220px] object-contain bg-[#fffaf5] p-4 transition-all duration-400 group-hover:scale-[1.05] group-hover:rotate-[2deg] group-hover:opacity-80"
                        loading="lazy"
                      />
                      <ArrowIcon />
                    </div>
                    <div className="p-5 flex-1 flex flex-col bg-white">
                      <RatingStars />
                      <h3 className="mt-2 text-[22px] font-semibold leading-[1.25em] !text-[#000811]" style={{ fontFamily: "var(--font-schibsted)" }}>
                        {it.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.5em] !text-[#181818] flex-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        {it.desc}
                      </p>
                      <p className="mt-3 text-[17px] font-semibold leading-[1.4em] !text-[#ff8414]" style={{ fontFamily: "var(--font-schibsted)" }}>
                        {it.price}
                      </p>
                    </div>
                  </article>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 52a65c37 — Advanced Machinery Ensuring Safe And Efficient Project Delivery. */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
              <img
                src="/rentx-reference/asset-5812aa885dbd3625.webp"
                alt="Advanced Machinery"
                className="w-full h-[300px] sm:h-[380px] lg:h-[460px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <div>
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Advanced Machinery Ensuring Safe And Efficient Project Delivery.
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                We combine dependable equipment, experienced support, and flexible rental options to help contractors complete projects safely, on schedule, and
                within budget.
              </p>
            </div>
            <div className="mt-6 grid gap-4">
              <div>
                <div className="flex gap-4 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">✓</span>
                  <div>
                    <h4 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Well-Maintained Equipment
                    </h4>
                    <p className="mt-1 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      Every machine undergoes strict safety checks before reaching your site for maximum uptime.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-4 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">⚡</span>
                  <div>
                    <h4 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                      Expert Technical Support
                    </h4>
                    <p className="mt-1 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      Our dedicated specialists provide round-the-clock guidance and swift on-site assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5a000a04 — Ready To Power Your Next Big Project? — petrol CTA */}
      <section className="py-12 bg-[var(--e-global-color-a3006c7)]">
        <div className="e-con flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div>
              <h2 className="text-white" style={{ fontFamily: "var(--font-schibsted)" }}>
                Ready To Power Your Next Big Project?
              </h2>
              <p className="mt-2 text-white/90 max-w-[560px] text-[16px] leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)" }}>
                Get the right heavy machinery for your job site with flexible rental options, quick delivery, and dependable project support.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/equipments"
                className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-white hover:text-[var(--e-global-color-accent)] transition-all duration-400"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Rent Equipment
                <span className="w-7 h-7 rounded-full bg-white text-[var(--e-global-color-accent)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-white hover:text-[var(--e-global-color-a3006c7)] transition-all duration-400"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Contact us
                <span className="w-7 h-7 rounded-full bg-white text-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 76ee8b8a — Complete Equipment Solutions For Every Project Scale */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow>SERVICES</Eyebrow>
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Complete Equipment Solutions For Every Project Scale
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                From construction jobs to infrastructure, our equipment rental services are designed to keep your operations moving.
              </p>
              <div className="mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  View All Services
                  <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Equipment Rental",
                desc: "Flexible short and long-term rental plans tailored precisely to fit your project timelines and equipment needs.",
                icon: "◆",
                image: "/rentx-reference/asset-6f0a6c644096be7a.webp",
              },
              {
                title: "Equipment Maintenance",
                desc: "Comprehensive on-site servicing and rapid repairs to keep your machinery running at peak performance.",
                icon: "⬢",
                image: "/rentx-reference/asset-b0dd7ed9d125e45e.webp",
              },
              {
                title: "Equipment Transportation",
                desc: "Safe, prompt delivery and hauling of heavy machinery directly to your designated job site.",
                icon: "⬣",
                image: "/rentx-reference/asset-1801c497addcd816.webp",
              },
            ].map((s, i) => (
              <div key={s.title}>
                <article className="rentx-service-card h-full flex flex-col">
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                    <span className="absolute right-4 top-4 w-11 h-11 rounded-full bg-[#ff8414] text-white inline-flex items-center justify-center text-lg">{s.icon}</span>
                  </div>
                  <div className="p-6 flex flex-1 flex-col">
                    <h3 className="text-[22px] font-semibold !text-[#000811]" style={{ fontFamily: "var(--font-schibsted)" }}>{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.5em] !text-[#181818] flex-1" style={{ fontFamily: "var(--font-poppins)" }}>{s.desc}</p>
                    <Link href="/services" className="mt-4 inline-flex items-center justify-between !text-[#ff8414] font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
                      Read More <ArrowIcon />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 42d5e579 — Three Simple Steps To Get Your Machinery */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div>
              <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                Three Simple Steps To Get Your Machinery
              </h2>
              <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Renting the right equipment is simple. Choose your machine, confirm your rental, and get it delivered to your job site.
              </p>
              <div className="mt-6">
                <Link
                  href="/equipments"
                  className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Book Your Equipment
                  <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
                </Link>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              {[
                { n: "01", t: "Choose Your Equipment", d: "Browse our equipment range and select the machine that fits your project." },
                { n: "02", t: "Confirm Your Rental", d: "Tell us your project requirements, rental period, and delivery location." },
                { n: "03", t: "Get It Delivered", d: "We arrange reliable equipment delivery so you can start work on schedule." },
              ].map((step, i) => (
                <div key={step.n}>
                  <div className="flex gap-4">
                    <div
                      className="shrink-0 w-14 h-14 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center font-bold text-[18px]"
                      style={{ fontFamily: "var(--font-schibsted)" }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h4 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                        {step.t}
                      </h4>
                      <p className="text-[16px] leading-[1.5em] text-[var(--e-global-color-text)] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        {step.d}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
              <img
                src="/rentx-reference/asset-575281107035dc13.webp"
                alt="Steps"
                className="w-full h-[340px] sm:h-[460px] lg:h-[580px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* fc02c5f — Explore Our Proven Projects Across Global Markets */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-0a33e2d)]">
        <div className="e-con">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-[640px]">
                <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Explore Our Proven Projects Across Global Markets
                </h2>
                <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  See how our equipment and rental solutions support construction, infrastructure, and industrial projects across environments.
                </p>
              </div>
              <Link href="#" className="shrink-0 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                View All
                <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div>
              <div className="rounded-[15px] overflow-hidden bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] h-full">
                <img
                  src="/rentx-reference/asset-d533f3e647b733a4.webp"
                  alt="Infrastructure Development"
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Infrastructure Development
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Supplying heavy-duty machinery for large-scale infrastructure and civil construction projects.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-[15px] overflow-hidden bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] h-full">
                <img
                  src="/rentx-reference/asset-6510feaa173e8f53.webp"
                  alt="Mining & Quarry"
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Mining & Quarry
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Supplying heavy-duty excavators and specialized haulers to accelerate large-scale mineral extraction.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-[15px] overflow-hidden bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] h-full">
                <img
                  src="/rentx-reference/asset-4bb6717e1dab0c13.webp"
                  alt="Urban Construction"
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Urban Construction
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Supplying heavy-duty excavators and specialized haulers to accelerate large-scale urban builds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cbd26ca — Real Feedback From Trusted Partners + Trusted by 500+ */}
      <section className="py-14 md:py-20 bg-white">
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
              <div className="rounded-[15px] p-6 shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)] bg-white border border-[var(--e-global-color-837ff2c)] relative overflow-hidden">
                <div className="text-[var(--e-global-color-accent)]">★★★★★</div>
                <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  “The flexibility in their rental terms and the quick delivery of excavators and loaders saved our project schedule multiple times. Outstanding
                  service.”
                </p>
                <p className="mt-4 font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  — Project Manager, Infrastructure Co.
                </p>
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[var(--e-global-color-accent)] rounded-full opacity-10" aria-hidden />
              </div>
            </div>
            <div>
              <div className="rounded-[15px] p-6 shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)] bg-white border border-[var(--e-global-color-837ff2c)] relative overflow-hidden">
                <div className="text-[var(--e-global-color-accent)]">★★★★★</div>
                <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  “What impresses us the most is their rapid on-site maintenance and technical support. Whenever we needed a replacement part or emergency
                  service, they were there.”
                </p>
                <p className="mt-4 font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  — Operations Director, Mining Group
                </p>
              </div>
            </div>
          </div>

          {/* Trusted by 500+ bar */}
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

      {/* 209fd6a6 — Meet Our Team Of Dedicated Heavy Machinery Experts */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-[640px]">
                <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Meet Our Team Of Dedicated Heavy Machinery Experts
                </h2>
                <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Our team understands construction equipment and works closely with clients to provide solutions for every project.
                </p>
              </div>
              <Link href="/about" className="shrink-0 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                View All
                <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: "THOMAS A. MILLER", role: "CHIEF EXECUTIVE OFFICER", img: "/rentx-reference/asset-29c6b323c5439882.webp" },
              { name: "BRADLEY COOPER", role: "SENIOR PROJECT MANAGER", img: "/rentx-reference/asset-425328391ba17fd7.webp" },
              { name: "JOSHUA STEVENS", role: "DIRECTOR OF OPERATIONS", img: "/rentx-reference/asset-93df904c03843109.webp" },
            ].map((m, i) => (
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

      {/* 2b261067 — Have Any Questions? We're Ready To Help — FAQ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
              Have Any Questions? We&apos;re Ready To Help
            </h2>
            <div className="mt-6 space-y-3">
              {[
                { q: "What types of equipment do you offer for rent?", a: "We provide a wide range of construction machinery, including excavators, loaders, bulldozers, backhoe loaders, and dump trucks — all well-maintained and ready." },
                { q: "Is an operator included with the equipment?", a: "Operator can be included on request. We provide certified operators for all heavy machinery." },
                { q: "How is the rental cost calculated?", a: "Rental cost is calculated per day, week or month — flexible plans with transparent pricing." },
                { q: "Is maintenance included during the rental period?", a: "Yes — comprehensive on-site servicing and rapid repairs to keep your machinery running at peak performance are included." },
                { q: "Do you provide delivery and pickup service?", a: "Yes — Heavy Machinery Transported Safely, On Time, Every Time. GPS-tracked and insured." },
                { q: "What happens if the equipment breaks down?", a: "We provide 24/7 rapid on-site maintenance and replacement to keep your project on schedule." },
                { q: "Do you offer emergency rental services?", a: "Yes — 24hr equipment delivery available for urgent projects. Contact us and we’ll arrange immediate dispatch." },
                { q: "How can I request a quote?", a: "Tell us your project requirements, rental period, and delivery location via our contact form or phone +1 (202) 555-0143 — we’ll respond within hours." },
              ].map((f, i) => (
                <details
                  key={f.q}
                  className="group rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] bg-white open:bg-[var(--e-global-color-a3006c7)] open:text-white transition-all duration-400"
                >
                  <summary className="list-none flex items-center justify-between p-[14px_30px] cursor-pointer font-semibold text-[var(--e-global-color-secondary)] group-open:text-white" style={{ fontFamily: "var(--font-schibsted)" }}>
                    <span>{f.q}</span>
                    <span className="ml-4 text-[var(--e-global-color-accent)] group-open:text-white group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-[30px] pb-4 text-white/90 text-[16px] leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)" }}>
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/faq" className="inline-flex items-center gap-2 text-[var(--e-global-color-accent)] font-medium hover:text-[var(--e-global-color-a3006c7)]" style={{ fontFamily: "var(--font-poppins)" }}>
                View all FAQs →
              </Link>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
              <img
                src="/rentx-reference/asset-ee39ddff6526b0ff.webp"
                alt="FAQ"
                className="w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 234662f5 — Latest News & Construction Industry Insights */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-[640px]">
                <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Latest News & Construction Industry Insights
                </h2>
                <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Discover useful equipment tips, construction insights, project updates, and the latest trends shaping the heavy machinery industry.
                </p>
              </div>
              <Link href="#" className="shrink-0 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                View All
                <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Guide to Selecting Durable Attachments for Your Compact Track…",
                img: "/rentx-reference/asset-e829920ee6a6604d.webp",
              },
              {
                title: "Understanding the Impact of Telematics on Modern Fleet Management…",
                img: "/rentx-reference/asset-75d333c55fb69d27.webp",
              },
              {
                title: "Comparing New Versus Used Heavy Equipment for Your Growing…",
                img: "/rentx-reference/asset-eb50e4edcae21853.webp",
              },
            ].map((b, i) => (
              <div key={b.title}>
                <div className="rounded-[15px] overflow-hidden bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] h-full flex flex-col">
                  <div className="overflow-hidden">
                    <img src={b.img} alt={b.title} className="w-full h-[200px] object-cover transition-all duration-400 hover:scale-[1.05]" loading="lazy" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-[18px] font-semibold leading-[1.3em] text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] flex-1" style={{ fontFamily: "var(--font-poppins)" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…
                    </p>
                    <Link href="#" className="mt-4 inline-flex items-center gap-2 text-[var(--e-global-color-accent)] font-medium text-[14px] hover:text-[var(--e-global-color-a3006c7)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6812dc40 — Get In Touch With Our Expert Agents */}
      <section className="py-14 md:py-20 bg-white">
        <div className="e-con grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
              Get In Touch With Our Expert Agents
            </h2>
            <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
              Tell us about your project and equipment requirements. Our team will help you find the right machinery and rental solution.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4">
                <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">☎</span>
                <div>
                  <p className="font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Phone Number
                  </p>
                  <p className="text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    +1 (202) 555-0143
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4">
                <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">✉</span>
                <div>
                  <p className="font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Email
                  </p>
                  <p className="text-[var(--e-global-color-accent)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    info@yourdomain.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-4">
                <span className="w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center">📍</span>
                <div>
                  <p className="font-semibold m-0" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Address
                  </p>
                  <p className="text-[var(--e-global-color-text)] m-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    100 Broadway, New York, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] p-6 space-y-4 bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Name" required className="rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }} />
                <input placeholder="Email" type="email" required className="rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }} />
              </div>
              <input placeholder="Subject" className="w-full rounded-[50px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }} />
              <textarea placeholder="Message" rows={4} className="w-full rounded-[20px] border border-[var(--e-global-color-text)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-poppins)" }} />
              <button type="submit" className="w-full bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* JSON-LD Breadcrumb home */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://rentx.example.com/" }],
          }),
        }}
      />
    </>
  );
}
