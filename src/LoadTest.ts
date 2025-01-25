import {Options, Results, RequestPerformaceMetrics} from "./types";
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
    this.promises = await Promise.allSettled(this.promises);
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
        await this.makeConcurrentRequests(func);
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
          await this.makeConcurrentRequests(func);
        }
        await sleep(1000);
      }
    }
  }

  private async setResults(responses: any) {
    const metrics: RequestPerformaceMetrics[] = [];
    for (const response of responses) {
      switch (this.options.engine !== null) {
        case this.options.engine === "axios": {
          const responseTime = response.timings.elapsedTime;
          const timeStamp = Date.now();
          metrics.push({response, responseTime, timeStamp});
          break;
        }
        case this.options.engine === "playwright": {
          metrics.push({
            response: response.value.response,
            responseTime: response.value.responseTime,
            timeStamp: response.value.timeStamp
          });
        }
      }
    }
    metrics.sort((a, b) => (a.responseTime > b.responseTime ? 1 : -1));
    const responseTimes = metrics.map(value => value.responseTime);
    this.results = {
      responseTimeAverage: Math.round(math.avg(responseTimes)),
      responseTimeMin: Math.round(math.min(responseTimes)),
      responseTimeMax: Math.round(math.max(responseTimes)),
      responseTime50th: Math.round(math.perc(responseTimes, 0.50)),
      responseTime75th: Math.round(math.perc(responseTimes, 0.75)),
      responseTime90th: Math.round(math.perc(responseTimes, 0.90)),
      config: {
        duration: this.options.duration ? this.options.duration : 0,
        iterations: this.options.iterations ? this.options.iterations : 0,
        iterationsPerSecond: this.options.ips ? this.options.ips : 0,
        stages: this.options.stages ? this.options.stages : 0,
      },
      totalIterations: responseTimes.length,
    };
  }

  async exec(func: Function) {
    switch (this.options.executor !== null) {
      case this.options.executor === "iterations": {
        await this.iterationsExecutor(func);
        await this.setResults(this.resolved);
        break;
      }
      case this.options.executor === "duration": {
        await this.durationExecutor(func);
        await this.setResults(this.resolved);
        break;
      }
      case this.options.executor === "iterations-per-second": {
        await this.iterationsPerSecondExecutor(func);
        await this.resolvePromises();
        await this.setResults(this.promises);
        break;
      }
      case this.options.executor === "variable-rate": {
        await this.variableRateExecutor(func);
        await this.resolvePromises();
        await this.setResults(this.promises);
        break;
      }
    }
  }

  async printResults() {
    console.dir(this.results, {depth: null});
  }
}
