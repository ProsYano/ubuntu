import { defineConfig } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
process.env.RENTX_E2E_DATA_DIR ||= mkdtempSync(join(tmpdir(), "rentx-browser-"));
export default defineConfig({
  testDir: "./tests/browser", fullyParallel: false, workers: 1, timeout: 120000,
  use: { actionTimeout: 15000, baseURL: "http://localhost:3101", channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === "darwin" ? "chrome" : undefined), trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "npm run dev -- --port 3101", url: "http://localhost:3101/connexion", reuseExistingServer: false, timeout: 120000, env: { RENTX_DATA_DIR: process.env.RENTX_E2E_DATA_DIR, NEXT_PUBLIC_SITE_URL: "http://localhost:3101", RENTX_TRUST_PROXY: "false" } },
});
