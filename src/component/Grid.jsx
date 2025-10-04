import { useEffect, useRef } from "react";
import useGrid from "../store/useGrid";
import useGridHooks from "../hooks/useGridHooks";

export function Grid() {
	const CELL_SIZE = 25;
	const gridState = useGrid((state) => state.gridState || []);
	const setDimensions = useGrid((state) => state.setDimensions || []);
	const { handleBoxClick, getCellColor, handleMouseOver, setMouseDown } =
		useGridHooks();
	const gridRef = useRef();

	useEffect(() => {
		function handleResize() {
			// Call your function here
			if(gridRef.current) {
				const el = gridRef.current;
				const rect = el.getBoundingClientRect();
				const style = getComputedStyle(el);
				const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
				const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
				const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
				const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

				const innerWidth = rect.width - paddingX - borderX;
				const innerHeight= rect.height - paddingY - borderY;
				
				setDimensions(Math.floor(innerHeight/CELL_SIZE) || 1, Math.floor(innerWidth/CELL_SIZE) || 1);
			}
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div ref={gridRef} className="flex-1 w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 overflow-auto">
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
