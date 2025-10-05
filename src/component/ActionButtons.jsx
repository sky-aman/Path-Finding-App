import { Play, RotateCcw } from "lucide-react";
import useGrid from "../store/useGrid";
import useIsRunning from "../store/useIsRunning";
import useAlgorithm from "../store/useAlgorithm";
import useBFS from "../hooks/useBFS";
import useDFS from "../hooks/useDFS";
import usePerformance from "../store/usePerformance";
import useDijkstra from "../hooks/useDijkstra";
import useAStar from "../hooks/useAstar";
import useBiDirectional from "../hooks/useBiDirectional";
import useBiDirectionalAStar from "../hooks/useBiDirectionalAStar";

const ActionButtons = () => {
	const resetGrid = useGrid((state) => state.resetGrid);
	const isRunning = useIsRunning((state) => state.isRunning);
	const algorithm = useAlgorithm((state) => state.algorithm);
	const clearPath = useGrid((state) => state.clearPath);
	const setDuration = usePerformance((state) => state.setDuration);
	const resetDuration = usePerformance((state) => state.resetDuration);

	const { bfs } = useBFS();
	const { dfs } = useDFS();
	const { dijkstra } = useDijkstra();
	const { aStar } = useAStar();
	const { biDirectionalAStar } = useBiDirectionalAStar();
	const { biDirectional } = useBiDirectional();

	const runAlgorithm = async () => {
		resetDuration();
		let algo;
		switch (algorithm) {
			case "bfs":
				algo = bfs; break;
			case "dfs":
				algo = dfs; break;
			case "dijkstra":
				algo = dijkstra; break;
			case "a-star":
				algo = aStar; break;
			case "bi-directional-a-star":
				algo = biDirectionalAStar; break;
			case "bi-directional":
				algo = biDirectional; break;
		}
		const startTime = performance.now();
		if (algo) {
			await algo();
		}
		setDuration((performance.now() - startTime).toFixed(2));
	};
	return (
		<>
			<div className="flex items-end gap-2">
				<button
					onClick={runAlgorithm}
					disabled={isRunning}
					className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
				>
					<Play size={20} />
					Run
				</button>
				<button
					onClick={clearPath}
					disabled={isRunning}
					className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
				>
					Clear Path
				</button>
			</div>

			<div className="flex items-end">
				<button
					onClick={resetGrid}
					disabled={isRunning}
					className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
				>
					<RotateCcw size={20} />
					Reset Grid
				</button>
			</div>
		</>
	);
};

export default ActionButtons;
