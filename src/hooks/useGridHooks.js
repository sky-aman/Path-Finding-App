import useGrid from "../store/useGrid";
import useMode from "../store/useMode";
import { getRowColFromElement } from "../utils/util";

const useGridHooks = () => {
	const setGridStateCell = useGrid((state) => state.setGridStateCell);
	const gridState = useGrid((state) => state.gridState);
	const start = useGrid((state) => state.start);
	const setStart = useGrid((state) => state.setStart);
	const targets = useGrid(state => state.targets);
	const setTargets = useGrid((state) => state.setTargets);
	const mode = useMode((state) => state.mode);

	const getCellColor = (row, col, color) => {
		if (start && start[0] === row && start[1] === col) {
			color = "start";
		}
		const key = `${row}-${col}`;
		if (targets.has(key)) {
			color = "target";
		}
		switch (color) {
			case "start":
				return "bg-green-500";
			case "target":
				return "bg-red-500";
			case "wall":
				return "bg-gray-800";
			case "visited":
				return "bg-blue-200";
			case "path":
				return "bg-yellow-400";
			default:
				return "bg-white border border-gray-200";
		}
	};

	const setGridColor = (x, y) => {
		if (mode === "start" && gridState[x][y] === "empty") setStart(x, y);

		if (mode === "target") {
			if (gridState[x][y] === "empty" || gridState[x][y] === "target")
				setTargets(x, y);
		}
		if (mode === "wall") {
			if (gridState[x][y] === "empty") setGridStateCell(x, y, "wall");
			else if (gridState[x][y] === "wall") setGridStateCell(x, y, "empty");
		}
	};

	const handleBoxClick = (event) => {
		const element = event.target;
		const [x, y] = getRowColFromElement(element);
		setGridColor(x, y);
	};

	return { handleBoxClick, getCellColor, setGridColor };
};

export default useGridHooks;
