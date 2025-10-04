import React, { useState } from "react";
import { getRowColFromElement } from "../utils/util";
import useMode from "../store/useMode";
import useGrid from "../store/useGrid";
import useGridHooks from "../hooks/useGridHooks";

export function Grid() {
	const [mouseDown, setMouseDown] = useState(false);
    const gridState = useGrid(state => state.gridState || []);
	const mode = useMode(state => state.mode);
	const CELL_SIZE = 25;
	
	const { handleBoxClick, getCellColor, setGridColor } = useGridHooks();

	const handleMouseOver = (event) => {
		if(mode === "wall" && event.target.classList.contains("box-item") && mouseDown) {
			const [x, y] = getRowColFromElement(event.target);
			setGridColor(x, y);
		}
	};
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
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
