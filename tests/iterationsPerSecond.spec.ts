import { test, expect } from "@playwright/test";
import perf from "../src";

perf.setOptions({
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({
  request,
}) => {
  await perf.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
