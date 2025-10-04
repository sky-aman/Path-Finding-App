import { callInInterval } from "../utils/util";
import useGrid from "../store/useGrid";
import useIsRunning from "../store/useIsRunning";
import useMapPath from "./useMapPath";

export default function useDijkstra() {
    const start = useGrid((state) => state.start);
	const gridState = useGrid((state) => state.gridState);
	const setGridStateCell = useGrid((state) => state.setGridStateCell);
	const targets = useGrid((state) => state.targets);
	const startRunning = useIsRunning((state) => state.startRunning);
	const stopRunning = useIsRunning((state) => state.stopRunning);
	const { mapPath } = useMapPath();
    
    const dijkstra = async () => {
        if (targets.size == 0 || !start) {
			return;
		}
        try {
            startRunning();
			// write here dijkstra
			stopRunning();
        } catch (err) {
			console.log(err);
			stopRunning();
		}
    }
    return { dijkstra }
}