# 🎭  playwright-load-test

[![NPM](https://img.shields.io/badge/NPM-0.1.3-red.svg)](https://www.npmjs.com/package/@nickvuono/playwright-load-test)
![Publish](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/npm.yml/badge.svg)
![CI](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/codeql.yml/badge.svg)
![Prettier](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/prettier.yml/badge.svg)
[![Style: prettier](https://img.shields.io/badge/Style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/License-Apache2.0-red.svg)]([http://opensource.org/licenses/MIT](https://github.com/nicholasvuono/playwright-load-test/blob/main/LICENSE))


A load testing harness for [Playwright API testing](https://playwright.dev/docs/api-testing)

Although this is inteded for use with the default Playwright API Request Context, this is a general load testing harness that could also be used with Axios, Fetch, etc.

### Prerequisites
`npm i @playwright/test`

### Installation
`npm i @nickvuono/playwright-load-test`

<br>

### Executors

| Executor | Description |
| -------- | ------- |
| `iterations` | runs a specified number of iterations syncronously |
| `duration` | runs iterations syncrounously for a given duration in seconds |
| `iterations-per-second` | run a specified number of iterations per second for a given duration in seconds |
| `variable-rate` | configure stages to ramp up and ramp down iterations per second over given durations in seconds |

Thes can be specified using the `config()` function like so:
```typescript
loadtest.config({
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});
```

<br>

### Iterations Executor Example
```typescript
import { test, expect } from "@playwright/test";
import loadtest from "@nickvuono/playwright-load-test";

loadtest.config({
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({ request }) => {
  await loadtest.exec(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Duration Executor Example
```typescript
import { test, expect } from "@playwright/test";
import loadtest from "@nickvuono/playwright-load-test";

loadtest.config({
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  await loadtest.exec(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Iterations per Second Executor Example
```typescript
import { test, expect } from "@playwright/test";
import loadtest from "@nickvuono/playwright-load-test";

loadtest.config({
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({
  request,
}) => {
  await loadtest.exec(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Varaible Rate Executor Example
```typescript
import { test, expect } from "@playwright/test";
import loadtest from "@nickvuono/playwright-load-test";

loadtest.config({
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
      duration: 10,
    },
  ],
});

test("Variable Rate Executor Test @variable-rate-executor", async ({
  request,
}) => {
  await loadtest.exec(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Contributors

[Nick Vuono](https://github.com/nicholasvuono) - creator and maintainer
