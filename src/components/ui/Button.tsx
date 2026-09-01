import Link from "next/link";
import type { ReactNode } from "react";

/* STYLES.md §4.1 — Bouton pill 13×26 50px — Poppins 16px 500 — hover #025466 */
type Props = {
  children: ReactNode;
  href?: string;
  variant?: "accent" | "petrol";
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({ children, href, variant = "accent", className = "", icon, type = "button", onClick }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium text-[16px] leading-[1.5em] px-[26px] py-[13px] rounded-[50px] border border-transparent transition-all duration-400 ease-[ease] cursor-pointer whitespace-nowrap no-underline";
  const styles =
    variant === "accent"
      ? "bg-[var(--e-global-color-accent)] text-white hover:bg-[var(--e-global-color-a3006c7)]"
      : "bg-[var(--e-global-color-a3006c7)] text-white hover:bg-[var(--e-global-color-accent)]";
  const cls = `${base} ${styles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} style={{ fontFamily: "var(--font-poppins)" }}>
        <span>{children}</span>
        {icon && <span className="ml-[15px] inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--e-global-color-a3006c7)] group-hover:bg-[var(--e-global-color-accent)] text-white text-[20px]">{icon}</span>}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} style={{ fontFamily: "var(--font-poppins)" }}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
