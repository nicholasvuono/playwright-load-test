import LoadTest from "./performance";
import Request from "./request";
import AxiosRequest from "./axios";

const perf = {
  test: new LoadTest(),
  req: new Request(),
  axios: new AxiosRequest(),
};

export default perf;
