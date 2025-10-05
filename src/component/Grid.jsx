import { useRef } from "react";
import useGrid from "../store/useGrid";
import useGridHooks from "../hooks/useGridHooks";
import { CELL_SIZE } from "../utils/constants";
import useGridResizeHook from "../hooks/useResizeHook";

export function Grid() {
	const gridState = useGrid((state) => state.gridState || []);

	const { handleBoxClick, getCellColor, handleMouseOver, setMouseDown } =
		useGridHooks();
	const gridRef = useRef();
	useGridResizeHook(gridRef);

	return (
		<div
			ref={gridRef}
			className="flex-1 flex justify-center w-full max-w-8xl mx-auto bg-white rounded-lg shadow-lg p-6 overflow-auto"
		>
			<div className="inline-block">
				<div
					className="inline-grid gap-0"
					style={{
						gridTemplateColumns: `repeat(${gridState?.[0]?.length}, ${CELL_SIZE}px)`,
					}}
					onMouseDown={() => setMouseDown(true)}
					onMouseUp={() => setMouseDown(false)}
					onMouseOver={handleMouseOver}
					onDragStart={(e) => e.preventDefault()}
				>
					{gridState.map((row, rowIdx) =>
						row.map((cell, colIdx) => (
							<div
								key={`${rowIdx}-${colIdx}`}
								row={rowIdx}
								col={colIdx}
								onClick={handleBoxClick}
								className={`${getCellColor(
									rowIdx,
									colIdx,
									cell
								)} box-item cursor-pointer transition-colors duration-200 hover:opacity-80`}
								style={{
									width: `${CELL_SIZE}px`,
									height: `${CELL_SIZE}px`,
								}}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
