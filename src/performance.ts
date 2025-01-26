import Types from "./types";
import Stats from "./stats";

const timeout = setTimeout;

const sleep = async (duration: number) => {
    await new Promise((resolve) => timeout(resolve, duration));
};

const sortResponseTimes = (arr: any[]) => {
    arr.sort((a, b) => (a.responseTime > b.responseTime ? 1 : -1));
    return arr.map(value => value.responseTime);
}

const setResults = (opts: Types.Options, arr: any[]) => {
    return {
        timings: {
          average: Stats.avg(arr),
          min: Stats.min(arr),
          max: Stats.max(arr),
          perc50: Stats.perc(arr,.5),
          perc75: Stats.perc(arr,.75),
          perc90: Stats.perc(arr,.9),
        },
        duration: opts.duration | 0,
        iterations: opts.iterations | 0,
        iterationsPerSecond: opts.ips | 0,
        totalIterations: opts.stages | 0,
      }
}

export default class LoadTest {
    private options: Types.Options;
    private resolved: any[] = []; //resolved function promises from syncronous requests
    private promises: any[] = []; //function promises from asyncrounous requests
    private results: Types.Results;

    config(options: Types.Options) {
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
        const metrics: Types.Metrics[] = [];
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
        const responseTimes = sortResponseTimes(metrics);
        this.results = setResults(this.options, responseTimes);
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
