import {test, expect} from "@playwright/test";
import perf from "../../src";
import {axiosInstance} from '../playwright.config'

perf.test.config({
  engine: "axios",
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async () => {
  perf.axios.config(axiosInstance);

  await perf.test.exec(async () => {
    const response = await perf.axios.get("/api");
    expect(response.response.status).toBe(200);
    expect(response.responseTime).toBeLessThan(3000);
    return response;
  });

  await perf.test.printResults();
});
