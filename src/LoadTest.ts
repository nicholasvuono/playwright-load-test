import { Options, Results } from "./types";
import math from "./math";

const timeout = setTimeout;

const sleep = async (duration: number) => {
  await new Promise((resolve) => timeout(resolve, duration));
};

export default class LoadTest {
  private options: Options;
  private resolved: any[] = [];
  private promises: Promise<any>[] = [];
  private results: Results;

  config(options: Options) {
    this.options = options;
  }

  private async resolvePromises() {
    await Promise.all(this.promises);
  }

  private async makeSyncronousRequests(func: Function) {
    this.resolved.push(await func());
  }

  private async makeConcurrentRequests(func: Function) {
    this.promises.push(
      new Promise((resolve) => {
        return resolve(func());
      })
    );
  }

  private async iterationsExecutor(func: Function) {
    for (let i = 0; i < this.options.iterations!; i++) {
      await this.makeSyncronousRequests(func);
    }
  }

  private async durationExecutor(func: Function) {
    let go = true;
    timeout(() => {
      go = false;
    }, this.options.duration! * 1000);
    while (go) {
      await this.makeSyncronousRequests(func);
    }
  }

  private async iterationsPerSecondExecutor(func: Function) {
    let go = true;
    timeout(() => {
      go = false;
    }, this.options.duration! * 1000);
    while (go) {
      for (let i = 0; i < this.options.ips!; i++) {
        this.makeConcurrentRequests(func);
      }
      await sleep(1000);
    }
  }

  private async variableRateExecutor(func: Function) {
    for (let j = 0; j < this.options.stages!.length; j++) {
      let go = true;
      timeout(() => {
        go = false;
      }, this.options.stages![j].duration! * 1000);
      while (go) {
        for (let i = 0; i < this.options.stages![j].ips!; i++) {
          this.makeConcurrentRequests(func);
        }
        await sleep(1000);
      }
    }
  }

  private async setResults(responses: any) {
    let responseTimes: number[] = [];
    for (const response of responses) {
      switch (this.options.engine !== null) {
        case this.options.engine === "axios": {
          responseTimes.push(response.timings.elapsedTime);
        }
        case this.options.engine === "playwright": {
          responseTimes.push(response.timings.elapsedTime);
        }
      }
    }
    responseTimes = responseTimes.sort();
    this.results = {
      responseTimeAverage: math.avg(responseTimes),
      responseTimeMin: math.min(responseTimes),
      responseTimeMax: math.max(responseTimes),
      responseTime90th: math.perc(responseTimes, 0.9),
      responseTime95th: math.perc(responseTimes, 0.95),
      responseTime99th: math.perc(responseTimes, 0.99),
      duration: this.options.duration ? this.options.duration : 0,
      iterations: this.options.iterations ? this.options.iterations : 0,
      iterationsPerSecond: this.options.ips ? this.options.ips : 0,
      totalIterations: responseTimes.length,
    };
  }

  async exec(func: Function) {
    switch (this.options.executor !== null) {
      case this.options.executor === "iterations": {
        await this.iterationsExecutor(func);
        break;
      }
      case this.options.executor === "duration": {
        await this.durationExecutor(func);
        break;
      }
      case this.options.executor === "iterations-per-second": {
        await this.iterationsPerSecondExecutor(func);
        break;
      }
      case this.options.executor === "variable-rate": {
        await this.variableRateExecutor(func);
        break;
      }
    }
    const responses = await this.resolvePromises();
    return await this.setResults(responses);
  }
}
