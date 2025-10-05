import { useState } from "react";
import useGrid from "../store/useGrid"
import { callInInterval } from "../utils/util";

const useGenerateMaze = () => {
    const [isGeneratingMaze, setIsGeneratingMaze] = useState(false);
    const gridState = useGrid(state => state.gridState);
    const resetGrid = useGrid(state => state.resetGrid);
    const setGridState = useGrid(state => state.setGridState);
    const setGridStateCell = useGrid(state => state.setGridStateCell);

    const generateMaze = async () => {        
        try{
            setIsGeneratingMaze(true);
            await resetGrid();
            const newGrid = gridState.map(row => row.map(cell => "wall"));
            await setGridState(newGrid);
            const visited = new Set();
            const GRID_ROW = gridState.length;
            const GRID_COL = gridState[0].length;
            
            const carvePath = async (row, col) => {
                const key = `${row}-${col}`;
                await callInInterval(() => setGridStateCell(row, col, "empty"), 20);
                visited.add(key);

                const dir = [[-2, 0], [0, 2], [2, 0], [0, -2]];
                for (let i = dir.length - 1; i > -1; i--) { 
                    const j = Math.floor(Math.random() * (i + 1)); 
                    [dir[i], dir[j]] = [dir[j], dir[i]]; 
                }

                for (let [dr, dc] of dir) {
                    const nRow = row + dr;
                    const nCol = col + dc;
                    const newKey = `${nRow}-${nCol}`
                    if (
                        nRow > 0 && nRow < GRID_ROW - 1 && 
                        nCol > 0 && nCol < GRID_COL - 1 && 
                        !visited.has(newKey)) {
                        await callInInterval(() => setGridStateCell(row + dr/2, col + dc/2, "empty"), 20);
                        await carvePath(nRow, nCol);
                    }
                }
            }
            await carvePath(1, 1)

        } catch (err) {
            console.log(err);
        }
        setIsGeneratingMaze(false);
    }

  return { isGeneratingMaze, generateMaze };
}

export default useGenerateMaze;
