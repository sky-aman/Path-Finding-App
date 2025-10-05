import { Grid3x3, Play, RotateCcw } from "lucide-react";
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
import useGenerateMaze from "../hooks/useGenerateMaze";
import useNotification from "../hooks/useNotification";

const ActionButtons = () => {
	const { showNotification } = useNotification();
	const resetGrid = useGrid((state) => state.resetGrid);
	const isRunning = useIsRunning((state) => state.isRunning);
	const algorithm = useAlgorithm((state) => state.algorithm);
	const clearPath = useGrid((state) => state.clearPath);
	const setDuration = usePerformance((state) => state.setDuration);
	const resetDuration = usePerformance((state) => state.resetDuration);
	const { isGeneratingMaze, generateMaze } = useGenerateMaze();
	const targets = useGrid((state) => state.targets);
	const start = useGrid((state) => state.start);

	const { bfs } = useBFS();
	const { dfs } = useDFS();
	const { dijkstra } = useDijkstra();
	const { aStar } = useAStar();
	const { biDirectionalAStar } = useBiDirectionalAStar();
	const { biDirectional } = useBiDirectional();

	const checkTargetsOnlyOne = () => {
		if (targets.size == 1) {
			return;
		}
		throw new Error(`Please select only one target for ${algorithm.toUpperCase()}`);
	}

	const runAlgorithm = async () => {
		resetDuration();
		if(targets.size == 0 || !start) {
			showNotification('Please set a start point (green) and at least one target point (red)!', 'error');
			return;
		}

		let algo;
		try {
			switch (algorithm) {
				case "bfs":
					algo = bfs;
					break;
				case "dfs":
					algo = dfs;
					break;
				case "dijkstra":
					algo = dijkstra;
					break;
				case "a-star":
					checkTargetsOnlyOne();
					algo = aStar;
					break;
				case "bi-directional-a-star":
					checkTargetsOnlyOne();
					algo = biDirectionalAStar;
					break;
				case "bi-directional":
					checkTargetsOnlyOne();
					algo = biDirectional;
					break;
			}
			const startTime = performance.now();
			if (algo) {
				await algo();
			}
			setDuration((performance.now() - startTime).toFixed(2));
			showNotification(`${algorithm.toUpperCase()} completed successfully!`, 'success');
		} catch (err) {
			showNotification(err.message || 'An error occurred during pathfinding', 'error');
			console.log(err.message);
		}
	};

	return (
		<>
			<div className="flex gap-2 items-end">
				<button
					onClick={runAlgorithm}
					disabled={isRunning}
					className="flex-1 text-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
				>
					<Play size={20} />
					Run
				</button>
				<button
					onClick={clearPath}
					disabled={isRunning}
					className="text-nowrap px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
				>
					Clear Path
				</button>
			</div>

			<div className="flex gap-2 items-end">
				<button
					onClick={generateMaze}
					disabled={isRunning || isGeneratingMaze}
					className="flex-1 text-nowrap bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
				>
					<Grid3x3 size={20} />
					{isGeneratingMaze ? "Generating..." : "Generate Maze"}
				</button>
				<button
					onClick={resetGrid}
					disabled={isRunning}
					className="flex-1 text-nowrap bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
				>
					<RotateCcw size={20} />
					Reset Grid
				</button>
			</div>
		</>
	);
};

export default ActionButtons;
