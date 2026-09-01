import { EquipmentCard } from "@/components/ui/Card";

/* STYLES.md §4.2 Equipment cards — H4 24px + prix 18px accent */
const items = [
  { title: "Heavy Duty Wheel Loader", price: "$550 /Day", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
  { title: "ZX350 Hydraulic Excavator", price: "$420 /Day", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" },
  { title: "CAT 320D Hydraulic Excavator", price: "$380 /Day", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
  { title: "All-Terrain Crane 120T", price: "$600 /Day", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { title: "Compact Track Loader", price: "$400 /Day", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" },
  { title: "Road Roller Compactor", price: "$500 /Day", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
];

export function EquipmentGrid() {
  return (
    <section className="py-14 md:py-20 bg-[var(--e-global-color-5f4d2bb)]">
      <div className="e-con">
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
              Powerful Machines. Built For Thought Projects.
            </h2>
            <p className="mt-3 text-[var(--e-global-color-text)]" style={{ fontFamily: "var(--font-poppins)" }}>
              Complete Equipment Solutions For Every Project Scale — curated, maintained, ready to roll.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={it.title}>
              <EquipmentCard {...it} href="/equipments" />
            </div>
          ))}
        </div>

        <div>
          <div className="mt-8 text-center">
            <a href="/equipments" className="btn-primary">
              View All Equipments →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
