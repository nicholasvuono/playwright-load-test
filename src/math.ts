// Assumes sorted arrays are passed
const math = {
  avg: (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length,
  min: (arr: number[]) => arr[0],
  max: (arr: number[]) => arr[arr.length - 1],
  perc: (arr: number[], percentile: number) =>
    arr[Math.round(arr.length * percentile)],
};

export default math;
