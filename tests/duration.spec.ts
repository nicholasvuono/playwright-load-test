import { test, expect } from "@playwright/test";
import loadtest, { req } from "../src";

loadtest.config({
  engine: "playwright",
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  req.config(request);

  await loadtest.exec(async () => {
    const response = await req.get("/api");
    expect(response.ok()).toBeTruthy();
    expect(req.responseTime()).
  });
});
