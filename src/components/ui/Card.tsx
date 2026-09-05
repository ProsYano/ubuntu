import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

/* STYLES.md §5 — Card 15px / shadow 0 0 30 0.15 / border #FFFFFF1F */
export function Card({ children, className = "", hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`bg-white rounded-[15px] border border-[var(--e-global-color-837ff2c)] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)] p-5 overflow-hidden ${hover ? "transition-all duration-400 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.12)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function EquipmentCard({
  title,
  price,
  image,
  href = "#",
}: {
  title: string;
  price: string;
  image: string;
  href?: string;
}) {
  return (
    <Link href={href} className="group block">
      {/* STYLES.md §4.2 — thumb radius 15/20 + hover scale 1.05 rotate 2deg */}
      <div className="overflow-hidden rounded-[15px] bg-white shadow-[9.899px_9.899px_30px_0_rgba(0,0,0,0.1)]">
        <div className="overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={800}
            height={440}
            className="w-full h-[220px] object-cover transition-all duration-400 ease-[ease] group-hover:scale-[1.05] group-hover:rotate-[2deg] group-hover:opacity-80"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h4 className="text-[24px] font-semibold leading-[1.3em] text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
            {title}
          </h4>
          <p className="mt-2 text-[18px] font-semibold leading-[1.4em] text-[var(--e-global-color-accent)]" style={{ fontFamily: "var(--font-schibsted)" }}>
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
}
