//import {APIResponse} from "playwright/test";
//import {AxiosResponse} from "axios";


export type Engine = "playwright" | "axios";

export type Executor =
  | "iterations"
  | "duration"
  | "iterations-per-second"
  | "variable-rate";

export type Stage = { ips: number; duration: number };

export type RequestPerformaceMetrics = {
//  response: APIResponse | AxiosResponse; //get explicit types to work somehow
  response: any;
  responseTime: number;
  timeStamp: number;
};

export type Options = {
  engine: Engine;
  executor: Executor;
  duration?: number;
  iterations?: number;
  ips?: number;
  stages?: Stage[];
};

export type Results = {
  responseTimeAverage: number;
  responseTimeMin: number;
  responseTimeMax: number;
  responseTime50th: number;
  responseTime75th: number;
  responseTime90th: number;
  duration: number;
  iterations: number;
  iterationsPerSecond: number;
  totalIterations: number;
};
