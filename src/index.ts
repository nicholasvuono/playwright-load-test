import LoadTest from "./performance";
import Request from "./Request";

const perf = {
    test: new LoadTest(),
    req: new Request(),
}

export default perf;