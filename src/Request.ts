import {
	type APIRequestContext,
	APIResponse,
	type Request as Req,
} from "playwright/test";

import type Types from "./types";

export const time = async (func: Function) => {
	const start = performance.now();
	const response = await func();
	const responseTime = performance.now() - start;
	return { response, responseTime };
};

export default class Request {
	private responseTime: number;
	private request: APIRequestContext;

	config(request: APIRequestContext) {
		this.request = request;
	}

	async get(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.get(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async post(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.post(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async put(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.put(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async patch(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.patch(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async delete(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.delete(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async dispose(options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.dispose(options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async fetch(url: string | Req, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.fetch(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async head(url: string, options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.head(url, options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	async storageState(options?: any): Promise<Types.Metrics> {
		const { response, responseTime } = await time(async () => {
			return await this.request.storageState(options);
		});
		const timeStamp = Date.now();
		this.responseTime = responseTime;
		return { response, responseTime, timeStamp };
	}

	getResponseTime() {
		return this.responseTime;
	}
}
