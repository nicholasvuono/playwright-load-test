import { test, expect } from "@playwright/test";
import loadtest from "../src";

loadtest.config({
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  await loadtest.exec(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
