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
  ],
  reporter: [["html", { outputFolder: "e2e/_report", open: "never" }]],
  webServer: {
    command:
      "pnpm --prefix examples/static-vite build && pnpm --prefix examples/static-vite preview --port 4173 --host",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
