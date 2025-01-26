import {test, expect} from "@playwright/test";
import perf from "../../src";

perf.test.config({
  engine: "playwright",
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({request}) => {
  perf.req.config(request);

  await perf.test.exec(async () => {
    const response = await perf.req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(perf.req.getResponseTime()).toBeLessThan(3000);
//    console.log(response)
    return response;
  });

  await perf.test.printResults();
});
