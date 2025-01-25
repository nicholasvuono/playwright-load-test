import { test, expect } from "@playwright/test";
import loadtest from "../src";

loadtest.config({
  engine: "playwright",
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({
  request,
}) => {
  await loadtest.exec(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
