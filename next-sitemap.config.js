/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rentx.example.com",
  generateRobotsTxt: false, // we use app/robots.ts
  generateIndexSitemap: false,
  outDir: "./public",
};
