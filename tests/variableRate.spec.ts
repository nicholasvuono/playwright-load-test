import { test, expect } from "@playwright/test";
import perf from "../src";

perf.setOptions({
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

test("Iterations per Second Executor Test @variable-rate-executor", async ({
  request,
}) => {
  await perf.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
