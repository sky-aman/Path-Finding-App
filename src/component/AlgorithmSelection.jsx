import useAlgorithm from "../store/useAlgorithm";

const AlgorithmSelection = () => {
	const algorithm = useAlgorithm((state) => state.algorithm);
	const setAlgorithm = useAlgorithm((state) => state.setAlgorithm);

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Algorithm
			</label>
			<select
				value={algorithm}
				onChange={(e) => setAlgorithm(e.target.value)}
				disabled={false}
				className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
			>
				<optgroup label="Supports Multiple Targets">
					<option value="bfs">Breadth First Search (BFS)</option>
					<option value="dfs">Depth First Search (DFS)</option>
					<option value="dijkstra">Dijkstra's Algorithm</option>
				</optgroup>

				<optgroup label="Only One Target Allowed">
					<option value="a-star">A* (A-star)</option>
					<option value="bi-directional">Bi-Directional</option>
					<option value="bi-directional-a-star">Bi-Directional A*</option>
				</optgroup>
			</select>
		</div>
	);
};

export default AlgorithmSelection;
