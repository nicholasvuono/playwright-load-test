import { Options } from "./types";

const write = process.stdout.write;

const timeout = setTimeout;

const sleep = async (duration: number) => {
  await new Promise((resolve) => setTimeout(resolve, duration));
};

export default class Runner {
  private options: Options;
  private resolved: any[] = [];
  private promises: Promise<any>[] = [];

  setOptions(options: Options) {
    this.options = options;
  }

  private async resolvePromises() {
    for (let i = 0; i < this.promises.length; i++) {
      this.resolved.push(await this.promises[i]);
    }
  }

  private async makeSyncronousRequests(func: Function) {
    this.resolved.push(await func());
  }

  private async makeConcurrentRequests(func: Function) {
    this.promises.push(
      new Promise((resolve) => {
        return resolve(func());
      }),
    );
  }

  private async iterationsExecutor(func: Function) {
    for (let i = 0; i < this.options.iterations!; i++) {
      await this.makeSyncronousRequests(func);
      write("|");
    }
  }

  private async durationExecutor(func: Function) {
    let go = true;
    timeout(() => {
      go = false;
    }, this.options.duration! * 1000);
    while (go) {
      await this.makeSyncronousRequests(func);
      write("|");
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
      write("|");
    }
  }

  async go(func: Function) {
    write("\nRUNNING:");
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
    }
    await this.resolvePromises();
    write("...COMPLETE!");
  }
}
