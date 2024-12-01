import { test, expect } from "@playwright/test";
import perf from "../src";

perf.setOptions({
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({ request }) => {
  await perf.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
