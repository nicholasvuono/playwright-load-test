import { test, expect } from "@playwright/test";
import loadtest from "../src";

loadtest.config({
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({ request }) => {
  await loadtest.exec(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
