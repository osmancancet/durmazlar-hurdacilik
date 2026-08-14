import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "masaüstü",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobil",
      use: { ...devices["iPhone 13"] },
    },
  ],

  /*
   * Testler geliştirme sunucusunu değil, yayına çıkacak statik çıktıyı sürer.
   * Her koşuda yeniden derlenir ki testler bayat bir `out/` klasörünü
   * doğrulayıp yanlışlıkla "geçti" demesin.
   */
  webServer: {
    command: `npm run build && node scripts/serve-out.mjs ${PORT}`,
    url: `http://localhost:${PORT}/tr/`,
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: "pipe",
  },
});
