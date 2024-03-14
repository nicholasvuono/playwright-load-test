import { test, expect } from "@playwright/test";
import run from "../src";

run.setOptions({
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  await run.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
