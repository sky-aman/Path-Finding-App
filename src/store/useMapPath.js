import { useCallback } from "react";
import useGrid from "./useGrid";
import { callInInterval } from "../utils/util";

const useMapPath = () => {
	const setGridStateCell = useGrid((state) => state.setGridStateCell);

	const mapPath = useCallback(async (path) => {
		for (let [row, col] of path.slice(0, path.length-1)) {
			await callInInterval(() => setGridStateCell(row, col, "path"), 10);
		}
	}, []);
	return { mapPath };
};

export default useMapPath;
