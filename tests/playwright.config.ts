import {defineConfig} from "@playwright/test";
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://yesno.wtf',
  timeout: 30000,
  headers: {}
});

export default defineConfig({
  testDir: '.',
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "https://yesno.wtf",
  },
  reporter: [['list'], ['html']],
});
