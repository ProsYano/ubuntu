"use client";
import Link from "next/link";
import { useState } from "react";

/* STYLES.md §9 Header elementor-45 — Top bar f818735 bg #025466 10×20 + Nav c9e8938 90px overlap -90px z999 */
/* STYLES.md §1.1 #FF8414 accent #025466 petrol #FFFFFF | §2 Poppins 16px 500 | §4.3 nav 0 15px | §5 radius 50px/6px shadows */
export function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const nav = [
    { label: "Home", href: "/", sub: null },
    { label: "Services", href: "/services", sub: [{ label: "Service Details", href: "/services" }] },
    { label: "Equipments", href: "/equipments", sub: [{ label: "Equipments Details", href: "/equipments" }] },
    {
      label: "Pages",
      href: "#",
      sub: [
        { label: "Our Team", href: "/about" },
        { label: "Blog", href: "#" },
        { label: "Single Post", href: "#" },
        { label: "FAQ's", href: "/faq" },
        { label: "Error 404", href: "/not-found" },
      ],
    },
    { label: "About us", href: "/about", sub: null },
    { label: "Contact us", href: "/contact", sub: null },
  ];

  return (
    <header className="relative z-[999]">
      {/* Top bar — STYLES.md §4.3 f818735 --padding 10px 20px bg #025466 */}
      <div className="bg-[var(--e-global-color-a3006c7)]">
        <div className="e-con flex flex-col md:flex-row items-center justify-between gap-0 py-[10px]">
          {/* Left icon-list — §4.3 icon 20px #FF8414 text #FFFFFF Poppins 16px 500 — hidden tablet/mobile per elementor-hidden-tablet/mobile */}
          <div className="hidden lg:flex items-center" style={{ fontFamily: "var(--font-poppins)" }}>
            <ul className="flex flex-wrap items-center m-0 list-none" style={{ marginInline: "-8px" } as React.CSSProperties}>
              <li className="flex items-center gap-2" style={{ marginInline: "8px" } as React.CSSProperties}>
                <span className="text-[var(--e-global-color-accent)] leading-none" style={{ fontSize: "20px", width: "1.25em", display: "inline-flex" }} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </span>
                <span className="text-white leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, color: "#FFFFFF" }}>
                  100 Broadway, New York, USA
                </span>
              </li>
              <li className="flex items-center gap-2" style={{ marginInline: "8px" } as React.CSSProperties}>
                <span className="text-[var(--e-global-color-accent)] leading-none" style={{ fontSize: "20px" }} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span className="text-white leading-[1.5em]" style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, color: "#FFFFFF" }}>
                  Working Hours: Mon–Sat, 8:00 AM – 6:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Right — 61c68f3 flex row */}
          <div className="flex items-center gap-0">
            {/* Search */}
            <a
              href="#"
              aria-label="Search"
              className="inline-flex items-center justify-center w-8 h-8 hover:!text-[#FF8414] transition-colors duration-300"
              style={{ color: "#FFFFFF" } as React.CSSProperties}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </a>

            {/* Divider a7ab85b — 1px #FFFFFF1F */}
            <div className="hidden md:flex items-center justify-center px-2" aria-hidden>
              <span className="block w-px h-6 bg-[var(--e-global-color-837ff2c)]" style={{ width: "1px" }} />
            </div>

            {/* Social 5321b7d — grid 7px icon 14px padding 10px bg #FF8414 */}
            <div className="flex items-center" style={{ gap: "7px" } as React.CSSProperties}>
              {[
                { label: "Facebook-f", d: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" },
                { label: "X-twitter", d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" },
                { label: "Pinterest-p", d: "M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" },
                { label: "Linkedin-in", d: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--e-global-color-accent)] text-white hover:bg-[var(--e-global-color-b4c3f3a)] hover:text-[var(--e-global-color-accent)] transition-all duration-300"
                  style={{ width: "calc(14px + 2*10px)", height: "calc(14px + 2*10px)", backgroundColor: "#FF8414", color: "#FFFFFF" } as React.CSSProperties}
                >
                  <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" aria-hidden style={{ fill: "currentColor" }}>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav bar — c9e8938 min-height 90px margin-bottom -90px z999 padding 0 20px align-items flex-end */}
      <div className="bg-transparent">
        <div className="e-con flex items-end justify-between gap-0 min-h-[90px] -mb-[90px] py-0 relative" style={{ alignItems: "flex-end", minHeight: "90px", marginBottom: "-90px", zIndex: 999, paddingLeft: "20px", paddingRight: "20px" } as React.CSSProperties}>
          {/* Logo 7181e44 width 220px — STYLES.md §7 */}
          <Link href="/" className="rentx-header-logo shrink-0 flex items-center h-[80px]" style={{ width: "220px" } as React.CSSProperties} aria-label="RentX home">
            <img src="/rentx-reference/asset-e108798da7088c3f.png" alt="RentX" className="h-[44px] w-auto object-contain" />
          </Link>

          {/* Desktop nav — b621e61 height 80px */}
          <nav className="hidden lg:flex items-center h-[80px]" aria-label="Main">
            <ul className="flex items-center m-0 list-none gap-0">
              {nav.map((it) => (
                <li key={it.label} className="relative group">
                  <Link
                    href={it.href}
                    className="inline-flex items-center gap-1 h-[80px] px-[15px] hover:!text-[#FF8414] transition-colors duration-400"
                    style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
                    onMouseEnter={() => it.sub && setOpenSub(it.label)}
                    onMouseLeave={() => setOpenSub(null)}
                  >
                    {it.label}
                    {it.sub && <span className="text-[10px] leading-none">▼</span>}
                  </Link>
                  {it.sub && (
                    <ul
                      className={`absolute left-0 top-full bg-white rounded-[6px] py-2 z-50 border-none transition-all duration-300 ${openSub === it.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"}`}
                      style={{ minWidth: "220px", backgroundColor: "#FFFFFF", borderRadius: "6px", boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.05)" } as React.CSSProperties}
                    >
                      {it.sub.map((s) => (
                        <li key={s.label}>
                          <Link
                            href={s.href}
                            className="block hover:!text-[#FF8414] hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, lineHeight: "1.5em", padding: "10px 20px", color: "#181818", backgroundColor: "transparent" } as React.CSSProperties}
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA — JKit bg #FF8414 hover #025466 pill 50px 13×26 */}
          <div className="hidden lg:flex items-center h-[80px]">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-all duration-400 hover:bg-[var(--e-global-color-a3006c7)]"
              style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, lineHeight: "1.5em", backgroundColor: "#FF8414", color: "#FFFFFF", padding: "13px 26px", borderRadius: "50px", border: "1px solid transparent" } as React.CSSProperties}
            >
              Contact us
              <span
                className="inline-flex items-center justify-center rounded-full text-white"
                style={{ width: "32px", height: "32px", backgroundColor: "#025466", color: "#FFFFFF", fontSize: "20px", marginLeft: "15px", borderRadius: "50%" } as React.CSSProperties}
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Hamburger — bg #FF8414 padding 18px */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rentx-menu-toggle lg:hidden self-center transition-all duration-400"
            style={{ backgroundColor: "#FF8414", padding: "18px", borderRadius: "6px", border: "1px solid #FF8414", color: "#FFFFFF" } as React.CSSProperties}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white mx-5 mt-2 p-4 border border-gray-100 absolute left-0 right-0 z-50" style={{ backgroundColor: "#FFFFFF", borderRadius: "6px", boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.05)" } as React.CSSProperties}>
            <ul className="flex flex-col m-0 list-none">
              {nav.map((it) => (
                <li key={it.label} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={it.href}
                      onClick={() => !it.sub && setOpen(false)}
                      className="block py-[10px] px-4 flex-1"
                      style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, color: "#181818" } as React.CSSProperties}
                    >
                      {it.label}
                    </Link>
                    {it.sub && (
                      <button onClick={() => setOpenSub(openSub === it.label ? null : it.label)} className="p-2" style={{ color: "#181818" } as React.CSSProperties} aria-label="toggle submenu">
                        {openSub === it.label ? "−" : "+"}
                      </button>
                    )}
                  </div>
                  {it.sub && openSub === it.label && (
                    <ul className="pl-6 pb-2 mx-2 mb-2" style={{ backgroundColor: "#FFF5ED", borderRadius: "6px" } as React.CSSProperties}>
                      {it.sub.map((s) => (
                        <li key={s.label}>
                          <Link href={s.href} onClick={() => setOpen(false)} className="block py-2 px-4" style={{ fontFamily: "var(--font-poppins)", fontSize: "14px", color: "#181818" } as React.CSSProperties}>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-3">
                <Link href="/contact" onClick={() => setOpen(false)} className="block text-center" style={{ fontFamily: "var(--font-poppins)", backgroundColor: "#FF8414", color: "#FFFFFF", padding: "13px 26px", borderRadius: "50px", fontWeight: 500 } as React.CSSProperties}>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
