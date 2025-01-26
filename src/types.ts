type Engine = "playwright" | "axios";

type Executor =
  | "iterations"
  | "duration"
  | "iterations-per-second"
  | "variable-rate";

type Stage = { ips: number; duration: number };

type Metric = {
  response: any;
  responseTime: number;
  timeStamp: number;
};

type Options = {
  engine: Engine;
  executor: Executor;
  duration?: number;
  iterations?: number;
  ips?: number;
  stages?: Stage[];
};

type Results = {
  timings: {
    average: number;
    min: number;
    max: number;
    perc50: number;
    perc75: number;
    perc90: number;
  };
  duration: number;
  iterations: number;
  iterationsPerSecond: number;
  totalIterations: number;
};

//probably a no no because of circular reference but oh well
import * as Types from "./types";
export default Types;
