import { test, expect } from "@playwright/test";
import loadtest from "../src";

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

test("Variable Rate Executor Test @variable-rate-executor", async ({
  request,
}) => {
  await loadtest.exec(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
