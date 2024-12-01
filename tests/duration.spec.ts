import { test, expect } from "@playwright/test";
import perf from "../src";

perf.setOptions({
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  await perf.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
