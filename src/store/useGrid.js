import { create } from "zustand";

const useGrid = create((set) => ({
	gridState: [],
	start: null,
	targets: new Set(),
	setDimensions: (rows, cols) =>
		set({
			rows,
			cols,
		}),
	setStart: (row, col) =>
		set({
			start: [row, col],
		}),
	setTargets: (row, col) =>
		set((state) => {
			const newTargets = new Set(state.targets);
			const target = `${row}-${col}`;
			if (newTargets.has(target)) {
				newTargets.delete(target);
			} else {
				newTargets.add(target);
			}
			return { targets: newTargets };
		}),
	setGridStateCell: (row, col, val) =>
		set((state) => {
			const newGrid = state.gridState.map((r, i) =>
				r.map((c, j) => (i === row && j === col ? val : c))
			);
			return { gridState: newGrid };
		}),
	setGridState: (gridState) =>
		set({
			gridState,
		}),
	resetGrid: () =>
		set((state) => {
			const newGrid = state.gridState.map((row) => row.map(() => "empty"));
			return { gridState: newGrid };
		}),
	clearPath: () =>
		set((state) => {
			const newGrid = state.gridState.map((row) =>
				row.map((val) => (val === "visited" || val === "path" ? "empty" : val))
			);
			return { gridState: newGrid };
		}),
}));

export default useGrid;
