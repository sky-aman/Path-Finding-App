import { callInInterval } from "../utils/util";
import useGrid from "../store/useGrid";
import useIsRunning from "../store/useIsRunning";
import useMapPath from "./useMapPath";
import MinHeap from "../utils/minHeap";

export default function useDijkstra() {
	const start = useGrid((state) => state.start);
	const gridState = useGrid((state) => state.gridState);
	const setGridStateCell = useGrid((state) => state.setGridStateCell);
	const targets = useGrid((state) => state.targets);
	const startRunning = useIsRunning((state) => state.startRunning);
	const stopRunning = useIsRunning((state) => state.stopRunning);
	const { mapPath } = useMapPath();
    let pathCount = 0;

	const dijkstra = async () => {
		if (targets.size == 0 || !start) {
			return;
		}
		try {
			startRunning();
			// write here dijkstra
			const rows = gridState.length;
			const cols = gridState[0].length;
			const visited = new Array(rows)
				.fill(false)
				.map(() => new Array(cols).fill(false));
			const distance = new Array(rows)
				.fill(Infinity)
				.map(() => new Array(cols).fill(Infinity));
			const priorityQ = new MinHeap([]);

			distance[start[0]][start[1]] = 0;
			priorityQ.heappush([0, ...start, []]); // [dist, row, col, path]

			while (priorityQ.length() > 0) {
				const [ dist, row, col, path ] = priorityQ.heappop();
				if (visited[row][col]) {
					continue;
				}
				if (gridState[row][col] === "empty")
					await callInInterval(() => setGridStateCell(row, col, "visited"), 10);

				visited[row][col] = true;
                const key = `${row}-${col}`;
				if (targets.has(key)) {
					pathCount+=1;
                    await mapPath(path);
                    if (pathCount === targets.size)
                        break;
				}

				const neighbors = [
					[row - 1, col],
					[row + 1, col],
					[row, col - 1],
					[row, col + 1],
				];

				for (const [nRow, nCol] of neighbors) {
					if (nRow < 0 || nRow >= rows || nCol < 0 || nCol >= cols) continue;
					if (gridState[nRow][nCol] === 'wall') continue;

					const newDist = dist + 1; // unweighted grid
					if (newDist < distance[nRow][nCol]) {
						distance[nRow][nCol] = newDist;
						priorityQ.heappush([newDist, nRow, nCol, [...path, [nRow, nCol]]]);
					}
				}
			}
			stopRunning();
		} catch (err) {
			console.log(err);
			stopRunning();
		}
	};
	return { dijkstra };
}
