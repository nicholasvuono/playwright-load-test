export type Executor =
  | "iterations"
  | "duration"
  | "iterations-per-second"
  | "variable-rate";

export type Stage = { ips: number; duration: number };

export type Options = {
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
  responseTime90th: number;
  responseTime95th: number;
  responseTime99th: number;
  duration: number;
  iterations: number;
  iterationsPerSecond: number;
  totalIterations: number;
};
