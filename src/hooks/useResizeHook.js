import { useEffect } from "react";
import { CELL_SIZE } from "../utils/constants";
import useGrid from "../store/useGrid";

const useGridResizeHook = (gridRef) => {
    const setDimensions = useGrid((state) => state.setDimensions || []);
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
}

export default useGridResizeHook;