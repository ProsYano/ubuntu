import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Equipments — CAT 320D Hydraulic Excavator & More",
  description: "Equipments Details — CAT 320D, ZX350, Wheel Loaders. Key Specifications, Features, Rental Availability. RentX premium fleet.",
  path: "/equipments",
});

const fleet = [
  { title: "Heavy Duty Wheel Loader", price: "$550 /Day", desc: "Versatile machines for high-capacity earthmoving, loading, and site clearing applications.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
  { title: "ZX350 Hydraulic Excavator", price: "$420 /Day", desc: "Compact yet powerful excavators built for demanding excavation and construction applications.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" },
  { title: "416F Backhoe Loader", price: "$380 /Day", desc: "A versatile machine combining digging, trenching, loading, and material handling capabilities.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
  { title: "Compact Wheel Loader", price: "$400 /Day", desc: "Versatile machines for digging, loading, trenching, and everyday construction work.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" },
  { title: "140 VC Motor Grader", price: "$500 /Day", desc: "Precision grading equipment designed for leveling, pushing, and fine-tuning challenging terrain.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { title: "745 Articulated Truck", price: "$600 /Day", desc: "Dependable hauling equipment for transporting soil, aggregates, debris, and construction materials.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
];

export default function EquipmentsPage() {
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
              <span className="text-white">Equipments Details</span>
            </div>
            <h1 className="text-white mt-2" style={{ fontFamily: "var(--font-schibsted)" }}>
              Equipments Details
            </h1>
          </div>
        </div>
      </section>

      {/* CAT 320D Hydraulic Excavator — main detail */}
      <section className="py-14 bg-white">
        <div className="e-con grid lg:grid-cols-[1.4fr_0.6fr] gap-8 items-start">
          <div>
            <div>
              <div className="overflow-hidden rounded-[15px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1100&auto=format&fit=crop" alt="CAT 320D" className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <h2 className="mt-6 text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                CAT 320D Hydraulic Excavator
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                  <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Key Specifications
                  </h3>
                  <ul className="mt-3 space-y-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] list-disc pl-5" style={{ fontFamily: "var(--font-poppins)" }}>
                    <li>Operating Weight: 20,000 kg</li>
                    <li>Engine Power: 164 HP</li>
                    <li>Dig Depth: 6.5 m</li>
                    <li>Bucket Capacity: 1.0 m³</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                  <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Equipment Features
                  </h3>
                  <ul className="mt-3 space-y-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] list-disc pl-5" style={{ fontFamily: "var(--font-poppins)" }}>
                    <li>GPS & Telematics ready</li>
                    <li>Fuel-efficient engine</li>
                    <li>Ergonomic cabin</li>
                    <li>24/7 support included</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-6 rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-[var(--e-global-color-b4c3f3a)]">
                <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Additional Options
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Operator included on request, spare parts & attachments available, preventive maintenance package.
                </p>
              </div>
            </div>

            <div>
              <div className="mt-6 rounded-[15px] bg-[var(--e-global-color-a3006c7)] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[var(--e-global-color-837ff2c)]">
                <div>
                  <h3 className="text-white text-[18px] font-semibold" style={{ fontFamily: "var(--font-schibsted)" }}>
                    Rental Availability
                  </h3>
                  <p className="text-white/80 text-[14px]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Available now — Daily, Weekly, Monthly
                  </p>
                </div>
                <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-white hover:text-[var(--e-global-color-accent)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                  Rent Now
                  <span className="w-7 h-7 rounded-full bg-white text-[var(--e-global-color-accent)] inline-flex items-center justify-center ml-2">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <div className="rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] p-5 bg-white">
                <h3 className="text-[18px] font-semibold text-[var(--e-global-color-secondary)] mb-4" style={{ fontFamily: "var(--font-schibsted)" }}>
                  All Equipments
                </h3>
                <ul className="space-y-2 m-0 list-none" style={{ fontFamily: "var(--font-poppins)" }}>
                  {fleet.map((f) => (
                    <li key={f.title}>
                      <Link href="/equipments" className="flex items-center justify-between px-4 py-3 rounded-[50px] bg-[var(--e-global-color-b4c3f3a)] text-[var(--e-global-color-text)] hover:bg-[var(--e-global-color-accent)] hover:text-white transition-colors text-[14px] font-medium">
                        {f.title}
                        <span>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="rounded-[15px] bg-[var(--e-global-color-a3006c7)] text-white p-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] border border-[var(--e-global-color-837ff2c)]">
                <h3 className="text-white text-[18px] font-semibold" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Need Help Choosing?
                </h3>
                <p className="mt-2 text-white/80 text-[14px]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Tell us your project and we’ll recommend the perfect machine.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-white hover:text-[var(--e-global-color-accent)] transition-all duration-400 w-full justify-center" style={{ fontFamily: "var(--font-poppins)" }}>
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet grid — Powerful Machines */}
      <section className="py-14 md:py-20 bg-[var(--e-global-color-b4c3f3a)]">
        <div className="e-con">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-[640px]">
                <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                  Powerful Machines. Built For Thought Projects.
                </h2>
                <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Choose from a wide range of well-maintained heavy machinery designed to deliver dependable performance across job sites.
                </p>
              </div>
              <Link href="/equipments" className="shrink-0 inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
                View All
                <span className="w-7 h-7 rounded-full bg-[var(--e-global-color-a3006c7)] inline-flex items-center justify-center ml-2">↗</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {fleet.map((it, i) => (
              <div key={it.title}>
                <a href="/equipments" className="group block">
                  <div className="overflow-hidden rounded-[15px] bg-white shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)] h-full flex flex-col">
                    <div className="overflow-hidden">
                      <img src={it.image} alt={it.title} className="w-full h-[220px] object-cover transition-all duration-400 group-hover:scale-[1.05] group-hover:rotate-[2deg] group-hover:opacity-80" loading="lazy" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-[24px] font-semibold leading-[1.3em] text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                        {it.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.5em] text-[var(--e-global-color-text)] flex-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        {it.desc}
                      </p>
                      <p className="mt-3 text-[18px] font-semibold leading-[1.4em] text-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                        {it.price}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
