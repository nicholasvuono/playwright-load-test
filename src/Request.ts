import { APIRequestContext, Request as Req } from "playwright/test";

const time = async (func: Function) => {
  const start = performance.now();
  const response = await func();
  const responseTime = performance.now() - start;
  return { response, responseTime };
};

type RequestPerformaceMetrics = {
  responseTime: number;
  timeStamp: number;
};

export default class Request {
  private responseTimes: Array<RequestPerformaceMetrics>;
  private responseTime: number;
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.responseTimes = [];
  }

  async get(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.get(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async post(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.post(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async put(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.put(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async patch(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.patch(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async delete(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.delete(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async dispose(options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.dispose(options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async fetch(url: string | Req, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.fetch(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async head(url: string, options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.head(url, options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async storageState(options?: any) {
    const { response, responseTime } = await time(async () => {
      return await this.request.storageState(options);
    });
    const timeStamp = Date.now();
    this.responseTime = responseTime;
    this.responseTimes.push({ responseTime, timeStamp });
    return response;
  }

  async resposeTime() {
    return this.responseTime;
  }
}
