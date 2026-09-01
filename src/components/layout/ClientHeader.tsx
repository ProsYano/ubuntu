"use client";

import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("./Header").then((module) => module.Header),
  { ssr: false },
);

export function ClientHeader() {
  return <Header />;
}
