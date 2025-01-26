import LoadTest from "./performance";
import Request from "./request";

const perf = {
    test: new LoadTest(),
    req: new Request(),
}

export default perf;