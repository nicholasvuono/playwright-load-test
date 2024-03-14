import { test, expect } from "@playwright/test";
import run from "../src";

run.setOptions({
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({ request }) => {
  await run.go(async () => {
    const response = await request.get("/api");
    expect(response.ok()).toBeTruthy();
  });
});
