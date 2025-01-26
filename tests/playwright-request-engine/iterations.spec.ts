import {test, expect} from "@playwright/test";
import perf from "../../src";

perf.test.config({
  engine: "playwright",
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({request}) => {
  perf.req.config(request);

  await perf.test.exec(async () => {
    const response = await perf.req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(perf.req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await perf.test.printResults();
});
