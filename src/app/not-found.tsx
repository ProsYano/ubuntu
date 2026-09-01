import Link from "next/link";

/* STYLES.md §1.1 #FF8414 §2 Schibsted 68px 800 §5 radius 50px 15px */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white pt-[140px] pb-20">
      <div className="e-con text-center">
        <div>
          <h1 className="text-[96px] font-extrabold leading-none text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
            404
          </h1>
          <h2 className="mt-4 text-[var(--e-global-color-secondary)]" style={{ fontFamily: "var(--font-schibsted)" }}>
            Oops! Page Not Found
          </h2>
          <p className="mt-3 text-[var(--e-global-color-text)] max-w-xl mx-auto" style={{ fontFamily: "var(--font-poppins)" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-[var(--e-global-color-accent)] text-white px-[26px] py-[13px] rounded-[50px] font-medium hover:bg-[var(--e-global-color-a3006c7)] transition-all duration-400" style={{ fontFamily: "var(--font-poppins)" }}>
              Back to Home
              <span className="w-7 h-7 rounded-full bg-white text-[var(--e-global-color-accent)] inline-flex items-center justify-center ml-2">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
