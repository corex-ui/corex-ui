import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./e2e/_test-results",

  projects: [
    {
      name: "vite-chromium-dist",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4173",
      },
    },
    {
      name: "cli-chromium-dist",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4174",
      },
    },
  ],
  reporter: [["html", { outputFolder: "e2e/_report", open: "never" }]],
  webServer: [
    {
      command:
        "pnpm --prefix tests/static-vite build && pnpm --prefix tests/static-vite preview --port 4173 --host",
      port: 4173,
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "pnpm --prefix tests/static-cli build && pnpm --prefix tests/static-cli preview --port 4174 --host",
      port: 4174,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
