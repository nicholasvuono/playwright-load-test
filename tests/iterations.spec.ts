import {test, expect} from "@playwright/test";
import loadtest, {req} from "../src";

loadtest.config({
  engine: "playwright",
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({request}) => {
  req.config(request);

  await loadtest.exec(async () => {
    const response = await req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await loadtest.printResults();
});
