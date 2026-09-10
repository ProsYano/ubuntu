import Image from "next/image";
import logo from "../../../public/branding/ubuntu-location-btp.jpg";

export function BrandLogo({ footer = false, preload = false }: { footer?: boolean; preload?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Ubuntu Location BTP"
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      sizes={footer ? "160px" : "(max-width: 800px) 68px, 84px"}
      preload={preload}
    />
  );
}
