import {test, expect} from "@playwright/test";
import perf from "../../src";

perf.test.config({
  engine: "playwright",
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({request}) => {
  perf.req.config(request);

  await perf.test.exec(async () => {
    const response = await perf.req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(perf.req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await perf.test.printResults();
});
