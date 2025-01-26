const round = (num: number) => Math.round(num);

// Assumes sorted arrays are passed
const Stats = {
	avg: (arr: number[]) => round(arr.reduce((a, b) => a + b, 0) / arr.length),
	min: (arr: number[]) => round(arr[0]),
	max: (arr: number[]) => round(arr[arr.length - 1]),
	perc: (arr: number[], percentile: number) =>
		round(arr[Math.round(arr.length * percentile)]),
};

export default Stats;
