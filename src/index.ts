import AxiosRequest from "./axios";
import LoadTest from "./performance";
import Request from "./request";

const perf = {
	test: new LoadTest(),
	req: new Request(),
	axios: new AxiosRequest(),
};

export default perf;
