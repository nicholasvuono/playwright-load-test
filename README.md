# 🎭  playwright-load-test

[![NPM](https://img.shields.io/badge/NPM-0.1.0-red.svg)](https://www.npmjs.com/package/@nickvuono/playwright-load-test)
![Publish](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/npm.yml/badge.svg)
![CI](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/codeql.yml/badge.svg)
![Prettier](https://github.com/nicholasvuono/playwright-load-test/actions/workflows/prettier.yml/badge.svg)
[![Style: prettier](https://img.shields.io/badge/Style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/License-Apache2.0-red.svg)]([http://opensource.org/licenses/MIT](https://github.com/nicholasvuono/playwright-load-test/blob/main/LICENSE))


A load testing harness for [Playwright API testing](https://playwright.dev/docs/api-testing)

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
| `variable` | ⚠️ In Progress - will allow for ramping up and ramping down iterations per second over given time spans |

Thes can be specified using the `setOptions()` function like so:
```typescript
run.setOptions({
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});
```

<br>

### Iterations Executor Example
```typescript
import { test, expect } from "@playwright/test";
import run from "@nickvuono/playwright-load-test";

run.setOptions({
  executor: "iterations",
  iterations: 10,
});

test("Iterations Executor Test @iterations-executor", async ({ request }) => {
  await run.go(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Duration Executor Example
```typescript
import { test, expect } from "@playwright/test";
import run from "@nickvuono/playwright-load-test";

run.setOptions({
  executor: "duration",
  duration: 10,
});

test("Duration Executor Test @duration-executor", async ({ request }) => {
  await run.go(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Iterations per Second Executor Example
```typescript
import { test, expect } from "@playwright/test";
import run from "@nickvuono/playwright-load-test";

run.setOptions({
  executor: "iterations-per-second",
  duration: 15,
  ips: 1,
});

test("Iterations per Second Executor Test @iterations-per-second-executor", async ({
  request,
}) => {
  await run.go(async () => {
    const response = await request.get("https://yesno.wtf/api");
    expect(response.ok()).toBeTruthy();
  });
});
```

<br>

### Contributing

1. Fork it (<https://github.com/your-github-user/playwright-load-test/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

<br>

### Contributors

[Nick Vuono](https://github.com/nicholasvuono) - creator and maintainer
