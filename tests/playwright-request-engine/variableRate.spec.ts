import {test, expect} from "@playwright/test";
import perf from "../../src";

perf.test.config({
  engine: "playwright",
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

test("Variable Rate Executor Test @variable-rate-executor", async ({request,}) => {
  perf.req.config(request);

  await perf.test.exec(async () => {
    const response = await perf.req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(perf.req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await perf.test.printResults();
});
