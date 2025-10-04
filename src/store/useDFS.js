import { callInInterval } from "../utils/util";
import useGrid from "./useGrid";
import useIsRunning from "./useIsRunning";
import useMapPath from "./useMapPath";

export default function useDFS() {
	const start = useGrid((state) => state.start);
	const gridState = useGrid((state) => state.gridState);
	const setGridStateCell = useGrid((state) => state.setGridStateCell);
	const targets = useGrid((state) => state.targets);
	const startRunning = useIsRunning((state) => state.startRunning);
	const stopRunning = useIsRunning((state) => state.stopRunning);
	const { mapPath } = useMapPath();

	const dfs = async () => {
		if (targets.size == 0 || !start) {
			return;
		}
		try {
			startRunning();
			const [sx, sy] = start;
			const range = [
				[-1, 0],
				[0, -1],
				[0, 1],
				[1, 0],
			];
			const queue = [];
			queue.push([sx, sy, []]);
			const visited = {};
			let pathCount = 0;
			visited[`${sx}-${sy}`] = true;
			while (queue.length > 0) {
				let [x, y, path] = queue.shift();
				const current = `${x}-${y}`;
				if (targets.has(current)) {
					pathCount++;
					await mapPath(path);
					if(targets.size == pathCount)
						break;
				}
				if (gridState[x][y] === 'empty') {
					await callInInterval(() => setGridStateCell(x, y, "visited"), 10);
				}
				for (let r of range) {
					const nx = x + r[0];
					const ny = y + r[1];
					if (
						nx >= 0 &&
						nx < gridState.length &&
						ny >= 0 &&
						ny < gridState[0].length
					) {
						if (
							!(
								visited[`${nx}-${ny}`] ||
								gridState[nx][ny] === "wall" ||
								(nx === sx && ny == sy)
							)
						) {
							visited[`${nx}-${ny}`] = true;
							queue.push([nx, ny, [...path, [nx, ny]]]);
						}
					}
				}
			}
			stopRunning();
		} catch (err) {
			console.log(err);
			stopRunning();
		}
	};
	return { dfs };
}
