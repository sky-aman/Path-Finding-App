import { callInInterval } from "../utils/util";
import useGrid from "../store/useGrid";
import useIsRunning from "../store/useIsRunning";
import useMapPath from "./useMapPath";

export default function useBiDirectional() {
	const start = useGrid((state) => state.start);
	const gridState = useGrid((state) => state.gridState);
	const setGridStateCell = useGrid((state) => state.setGridStateCell);
	const targets = useGrid((state) => state.targets);
	const startRunning = useIsRunning((state) => state.startRunning);
	const stopRunning = useIsRunning((state) => state.stopRunning);
	const { mapPath } = useMapPath();

	const biDirectional = async () => {
		debugger;
		if (targets.size == 0 || targets.size > 1 || !start) {
			return;
		}
		const target = [...targets][0].split("-").map((ele) => Number(ele));
		const [tx, ty] = target;
		try {
			startRunning();
			const [sx, sy] = start;
			const range = [
				[-1, 0],
				[0, -1],
				[0, 1],
				[1, 0],
			];
			const startQ = [[sx, sy]];
			const endQ = [[tx, ty]];

			const startVisited = {};
			const endVisited = {};
			startVisited[`${sx}-${sy}`] = [];
			endVisited[`${tx}-${ty}`] = [];
			while (startQ.length > 0 && endQ.length > 0) {
				let [startX, startY] = startQ.shift();
				let [endX, endY] = endQ.shift();
				const startKey = `${startX}-${startY}`;
				const endKey = `${endX}-${endY}`;
				if (startKey in endVisited) {
					await mapPath([...startVisited[startKey], ...endVisited[startKey]]);
					break;
				}
				if (endKey in startVisited) {
					await mapPath([...startVisited[endKey], ...endVisited[endKey]]);
					break;
				}
				if (gridState[startX][startY] === "empty")
					await callInInterval(
						() => setGridStateCell(startX, startY, "visited"),
						10
					);
				if (gridState[endX][endY] === "empty")
					await callInInterval(
						() => setGridStateCell(endX, endY, "visited"),
						10
					);

				for (let r of range) {
					const snx = startX + r[0];
					const sny = startY + r[1];
					const enx = endX + r[0];
					const eny = endY + r[1];
					if (
						snx >= 0 &&
						snx < gridState.length &&
						sny >= 0 &&
						sny < gridState[0].length
					) {
						if (
							!(
								startVisited[`${snx}-${sny}`] ||
								gridState[snx][sny] === "wall" ||
								(snx === sx && sny == sy)
							)
						) {
							startVisited[`${snx}-${sny}`] = [
								...startVisited[startKey],
								[snx, sny],
							];
							startQ.push([snx, sny]);
						}
					}
					if (
						enx >= 0 &&
						enx < gridState.length &&
						eny >= 0 &&
						eny < gridState[0].length
					) {
						if (
							!(
								endVisited[`${enx}-${eny}`] ||
								gridState[enx][eny] === "wall" ||
								(enx === sx && eny == sy)
							)
						) {
							endVisited[`${enx}-${eny}`] = [...endVisited[endKey], [enx, eny]];
							endQ.push([enx, eny]);
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
	return { biDirectional };
}
