"use client";

import Image from "next/image";
import Link from "next/link";

const stats = [["120+", "Areas Covered"], ["750+", "Equipment Units"], ["12k+", "Happy Customers"]];

export function Hero() {
  return (
    <section className="rentx-hero relative isolate min-h-[680px] overflow-hidden bg-[#000811]">
      <Image src="/rentx-reference/asset-0ce01cf52a749e06.webp" alt="Construction site" fill priority sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="e-con relative flex min-h-[680px] items-center pt-[105px] pb-[70px]">
        <div className="relative z-20 max-w-[710px]">
          <div><h1 className="text-white uppercase">Empowering Your Projects With Our <span className="text-[#ff8414]">Premium Machinery</span></h1></div>
          <div><p className="mt-5 max-w-[650px] text-white/90">Reliable heavy-duty equipment and professional rental solutions to keep your complex and demanding construction projects moving safely, efficiently, and successfully on schedule.</p></div>
          <div><div className="rentx-hero-actions mt-8 flex flex-wrap gap-4">
            <Link href="/equipments" className="btn-primary">Explore Equipment <span className="rentx-arrow">↗</span></Link>
            <Link href="/contact" className="rentx-outline-btn">Get a Quote <span className="rentx-arrow rentx-arrow-light">↗</span></Link>
          </div></div>
        </div>
        <Image src="/rentx-reference/asset-b2f49d8c0899fa18.png" alt="Heavy wheel loader" width={630} height={480} className="absolute bottom-[-24px] right-[-75px] z-10 hidden w-[630px] object-contain lg:block" />
        <div className="absolute bottom-[38px] left-5 z-30 hidden overflow-hidden rounded-[15px] bg-white shadow-2xl md:flex">
          {stats.map(([value, label]) => <div key={label} className="min-w-[150px] px-6 py-5 text-center"><div className="font-schibsted text-[30px] font-bold leading-none text-[#000811]">{value}</div><div className="mt-1 text-[11px] text-[#181818]">{label}</div></div>)}
        </div>
        <div className="absolute right-7 top-[185px] z-30 hidden rounded-[15px] bg-white px-7 py-5 text-center shadow-2xl lg:block"><div className="text-[13px] text-[#181818]">Enjoy</div><div className="font-schibsted text-[32px] font-extrabold text-[#ff8414]">20%</div><div className="text-[12px] font-semibold text-[#000811]">First Booking</div></div>
      </div>
    </section>
  );
}
