import { Card } from "@/components/ui/Card";

/* STYLES.md §4.2 Icon-box 3767186 border 1px #FFFFFF1F radius 15 shadow 15 gap 15 */
const features = [
  { icon: "◆", title: "Equipment Rental", desc: "Flexible daily, weekly, monthly plans — premium fleet, zero compromise." },
  { icon: "⬢", title: "On-Time Delivery", desc: "Heavy Machinery Transported Safely, On Time, Every Time." },
  { icon: "⬣", title: "Expert Support", desc: "Dedicated heavy machinery experts — setup, training, maintenance." },
];

export function Features() {
  return (
    <section className="py-14 bg-[var(--e-global-color-b4c3f3a)]">
      <div className="e-con">
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title}>
              <Card>
                <div className="flex items-center gap-[15px]">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[var(--e-global-color-accent)] text-white inline-flex items-center justify-center text-xl">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
                      {f.title}
                    </h4>
                    <p className="mt-1 text-[16px] leading-[1.5em] text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
