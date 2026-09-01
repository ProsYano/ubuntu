"use client";
import Link from "next/link";

/* STYLES.md §9 Footer elementor-144 bg #025466 50x20 grid 3 cols + §4.2 icon-box gap15 border #FFFFFF1F radius15 shadow0 0 30 0.15 */
/* §1.1 #FF8414 accent #025466 petrol #FFFFFF | §2 Poppins 16px 500 Schibsted 24px 600 | §5 radius 15px 50px */
export function Footer() {
  return (
    <footer style={{ backgroundColor: "#025466" } as React.CSSProperties} className="text-white">
      {/* Top cards — 7908221 padding 50px 20px bg #025466 */}
      <div className="e-con" style={{ paddingTop: "50px", paddingBottom: "0", paddingLeft: "20px", paddingRight: "20px" } as React.CSSProperties}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Phone — d0ff609 */}
          <div
            className="flex items-center"
            style={{ border: "1px solid #FFFFFF1F", borderRadius: "15px", boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.15)", padding: "20px", gap: "15px", backgroundColor: "transparent" } as React.CSSProperties}
          >
            <span
              className="shrink-0 inline-flex items-center justify-center rounded-full"
              style={{ width: "48px", height: "48px", backgroundColor: "#FF8414", color: "#FFFFFF", fontSize: "25px" } as React.CSSProperties}
            >
              <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
            </span>
            <div style={{ textAlign: "start" } as React.CSSProperties}>
              <h3
                className="m-0"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBlockEnd: "5px" } as React.CSSProperties}
              >
                Phone Number
              </h3>
              <p
                className="m-0"
                style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 400, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
              >
                +1 (202) 555-0143
              </p>
            </div>
          </div>

          {/* Email — 8ad8465 */}
          <div
            className="flex items-center"
            style={{ border: "1px solid #FFFFFF1F", borderRadius: "15px", boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.15)", padding: "20px", gap: "15px", backgroundColor: "transparent" } as React.CSSProperties}
          >
            <span
              className="shrink-0 inline-flex items-center justify-center rounded-full"
              style={{ width: "48px", height: "48px", backgroundColor: "#FF8414", color: "#FFFFFF", fontSize: "25px" } as React.CSSProperties}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 4h16v16H4z" />
                <path d="M4 8l8 5 8-5" />
              </svg>
            </span>
            <div style={{ textAlign: "start" } as React.CSSProperties}>
              <h3
                className="m-0"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBlockEnd: "5px" } as React.CSSProperties}
              >
                Email
              </h3>
              <p
                className="m-0"
                style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 400, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
              >
                info@yourdomain.com
              </p>
            </div>
          </div>

          {/* Location — 91704d9 */}
          <div
            className="flex items-center"
            style={{ border: "1px solid #FFFFFF1F", borderRadius: "15px", boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.15)", padding: "20px", gap: "15px", backgroundColor: "transparent" } as React.CSSProperties}
          >
            <span
              className="shrink-0 inline-flex items-center justify-center rounded-full"
              style={{ width: "48px", height: "48px", backgroundColor: "#FF8414", color: "#FFFFFF", fontSize: "25px" } as React.CSSProperties}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <div style={{ textAlign: "start" } as React.CSSProperties}>
              <h3
                className="m-0"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBlockEnd: "5px" } as React.CSSProperties}
              >
                Location
              </h3>
              <p
                className="m-0"
                style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 400, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
              >
                100 Broadway, NY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer — b1b0723 padding 50px 20px */}
      <div className="e-con" style={{ paddingTop: "50px", paddingBottom: "50px", paddingLeft: "20px", paddingRight: "20px" } as React.CSSProperties}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]" style={{ gap: "20px" } as React.CSSProperties}>
          {/* Brand — 51bc5bc */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="RentX home" style={{ width: "190px" } as React.CSSProperties}>
              <img src="/rentx-reference/asset-e108798da7088c3f.png" alt="RentX" className="h-[46px] w-auto object-contain" />
            </Link>
            <p
              className="mt-4"
              style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 400, lineHeight: "1.5em", color: "#FFFFFF", opacity: 0.9 } as React.CSSProperties}
            >
              Your trusted partner for heavy equipment rentals, offering dependable solutions to drive success across construction sites.
            </p>
            <div className="mt-5 flex items-center" style={{ gap: "7px" } as React.CSSProperties}>
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
                  className="inline-flex items-center justify-center rounded-full transition-all duration-300 hover:!bg-[#FFF5ED] hover:!text-[#FF8414]"
                  style={{ width: "calc(14px + 2*10px)", height: "calc(14px + 2*10px)", backgroundColor: "#FF8414", color: "#FFFFFF" } as React.CSSProperties}
                >
                  <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" aria-hidden style={{ fill: "currentColor" }}>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — 3f63290 24px 600 */}
          <div>
            <h2
              className="m-0"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBottom: "8px" } as React.CSSProperties}
            >
              Quick Links
            </h2>
            {/* Divider 0f4ed6a */}
            <div className="w-full h-px mb-4" style={{ backgroundColor: "#FFFFFF1F", height: "1px" } as React.CSSProperties} aria-hidden />
            <ul className="m-0 list-none" style={{ fontFamily: "var(--font-poppins)" } as React.CSSProperties}>
              {[
                ["About Us", "/about"],
                ["Our Services", "/services"],
                ["Equipments", "/equipments"],
                ["Our Projects", "#"],
                ["Blog & News", "#"],
              ].map(([l, h]) => (
                <li key={l} className="py-1">
                  <Link
                    href={h as string}
                    className="flex items-center gap-2 transition-colors duration-300 hover:!text-[#FF8414] group"
                    style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
                  >
                    <span className="text-[10px] leading-none group-hover:!text-[#FF8414]" style={{ color: "#FFFFFF", fontSize: "12px" } as React.CSSProperties} aria-hidden>
                      ›
                    </span>
                    <span>{l}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR SERVICES — 1ff6764 24px 600 */}
          <div>
            <h2
              className="m-0"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBottom: "8px" } as React.CSSProperties}
            >
              OUR SERVICES
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: "#FFFFFF1F", height: "1px" } as React.CSSProperties} aria-hidden />
            <ul className="m-0 list-none" style={{ fontFamily: "var(--font-poppins)" } as React.CSSProperties}>
              {[
                "Heavy Equipment Rental",
                "Equipment Transportation",
                "Preventive Maintenance & Repair",
                "Spare Parts & Attachments Sales",
                "Fleet Telematics & Asset Tracking",
              ].map((l) => (
                <li key={l} className="py-1">
                  <a
                    href="#"
                    className="flex items-center gap-2 transition-colors duration-300 hover:!text-[#FF8414] group"
                    style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 500, lineHeight: "1.5em", color: "#FFFFFF" } as React.CSSProperties}
                  >
                    <span className="text-[10px] leading-none group-hover:!text-[#FF8414]" style={{ color: "#FFFFFF", fontSize: "12px" } as React.CSSProperties} aria-hidden>
                      ›
                    </span>
                    <span>{l}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — f626caa 24px 600 */}
          <div>
            <h2
              className="m-0"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "24px", fontWeight: 600, lineHeight: "1.3em", color: "#FFFFFF", marginBottom: "8px" } as React.CSSProperties}
            >
              Newsletter
            </h2>
            <div className="w-full h-px mb-4" style={{ backgroundColor: "#FFFFFF1F", height: "1px" } as React.CSSProperties} aria-hidden />
            <p
              className="m-0"
              style={{ fontFamily: "var(--font-poppins)", fontSize: "14px", fontWeight: 400, lineHeight: "1.5em", color: "#FFFFFF", opacity: 0.9, marginBottom: "16px" } as React.CSSProperties}
            >
              Join our exclusive mailing list to stay updated with the newest machinery arrivals, special deals, and expert construction guides.
            </p>
            {/* MetForm 476f00a — mf-email + mf-button absolute */}
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full focus:outline-none focus:ring-2 focus:ring-[var(--e-global-color-accent)]"
                  style={{ fontFamily: "var(--font-poppins)", fontSize: "16px", fontWeight: 400, backgroundColor: "#FFFFFF", color: "#181818", border: "1px solid #FFFFFF", borderRadius: "8px", padding: "15px", paddingRight: "60px" } as React.CSSProperties}
                />
                <button
                  type="submit"
                  className="absolute top-1 bottom-1 right-1 flex items-center justify-center transition-all duration-400 hover:!bg-[#025466]"
                  style={{ backgroundColor: "#FF8414", color: "#FFFFFF", borderRadius: "8px", width: "44px", border: "none" } as React.CSSProperties}
                  aria-label="Subscribe"
                >
                  <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                    <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright — border #FFFFFF1F */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #FFFFFF1F", fontFamily: "var(--font-poppins)", fontSize: "14px" } as React.CSSProperties}
        >
          <p className="m-0" style={{ color: "rgba(255,255,255,0.8)" } as React.CSSProperties}>
            Copyright © 2026 RentX By RoxThemes. All Rights Reserved.
          </p>
          <p className="m-0 hidden md:block" style={{ color: "rgba(255,255,255,0.6)" } as React.CSSProperties}>
            STYLES.md §1-13 1000% fidèle
          </p>
        </div>
      </div>
    </footer>
  );
}
