import {defineConfig} from "@playwright/test";

export default defineConfig({
  testDir: '.',
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "https://yesno.wtf",
  },
  reporter: [['list'], ['html']],
});
