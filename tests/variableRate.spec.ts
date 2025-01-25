import {test, expect} from "@playwright/test";
import loadtest, {req} from "../src";

loadtest.config({
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
  req.config(request);

  await loadtest.exec(async () => {
    const response = await req.get("/api");
    expect(response.response.ok()).toBeTruthy();
    expect(req.getResponseTime()).toBeLessThan(3000);
    return response;
  });

  await loadtest.printResults();
});
