import {test, expect} from "@playwright/test";
import loadtest, {req} from "../src";

loadtest.config({
  engine: "playwright",
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({request}) => {
  req.config(request);

  await loadtest.exec(async () => {
    const response = await req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await loadtest.printResults();
});
