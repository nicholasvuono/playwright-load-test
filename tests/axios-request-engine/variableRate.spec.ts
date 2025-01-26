import {test, expect} from "@playwright/test";
import perf from "../../src";
import {axiosInstance} from '../playwright.config'

perf.test.config({
  engine: "axios",
  executor: "variable-rate",
  stages: [
    {
      ips: 1,
      duration: 5,
    },
    {
      ips: 2,
      duration: 5,
    },
    {
      ips: 1,
      duration: 5,
    },
  ],
});

test("Variable Rate Executor Test @variable-rate-executor", async () => {
  perf.axios.config(axiosInstance);

  await perf.test.exec(async () => {
    const response = await perf.axios.get("/api");
    expect(response.response.status).toBe(200);
    expect(response.responseTime).toBeLessThan(3000);
    return response;
  });

  await perf.test.printResults();
});
