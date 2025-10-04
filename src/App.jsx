import { useState, useEffect } from 'react';
import Header from './component/Header';
import depthFirstSearch from './utils/depthFirstSearch';
import dijkstra from './utils/dijkstra';
import { Grid } from './component/Grid';
import Legend from './component/Legend';
import useGrid from './store/useGrid';

/**
 * Applies a search algorithm to the gridState, starting from the startElement
 * and updating the gridState using updateGrid. The total number of targets
 * is given by totalTargets.
 * 
 * @param {Function} cb The search algorithm to use
 * @param {number} totalTargets The total number of targets to find
 * @param {string[][]} gridState The current state of the grid
 * @param {Function} updateGrid The function to use to update the gridState
 */
function applyAlgorithm (cb, totalTargets, gridState, updateGrid)
{
  if (totalTargets < 1)
  {
    return;
  }
  const startElement = document.querySelector('.bg-success');

  const sx = startElement.getAttribute('row');
  const sy = startElement.getAttribute('col');

  cb(totalTargets, {row: parseInt(sx), col: parseInt(sy)}, gridState, updateGrid);
}

/**
 * The main component of the application.
 */
function App ()
{
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const gridState = useGrid(state => state.gridState);
  const setGridState = useGrid(state => state.setGridState);

  useEffect(() =>
  {
    const gridRow = [];
    for (let i = 0; i < rows; i++)
    {
      const gridColumn = [];
      for (let j = 0; j < cols; j++)
      {
        gridColumn.push('empty');
      }
      gridRow.push(gridColumn);
    }
    setGridState(gridRow);
  },
    [rows, cols]);

  /**
   * Updates the entire grid to the newGrid provided.
   * 
   * @param {string[][]} newGrid The new state of the grid
   */
  function updateGrid (newGrid)
  {
    setGridState(newGrid);
  }

  /**
  Update the dimensions of the grid.
  @param {number} rows - The number of rows in the grid.
  @param {number} cols - The number of columns in the grid.
  */
  function updateGridDimension (rows, cols)
  {
    setRows(rows);
    setCols(cols);
  }
  /**
  Start the selected algorithm on the grid.
  @param {string} algo - The selected algorithm (either 'bfs' or 'dfs').
  */
  function onStartAlgo (algo)
  {
    let fn;
    switch (algo)
    {
      case 'dfs': fn = depthFirstSearch; break;
      case 'dks': fn = dijkstra; break;
      default: return;
    }
    applyAlgorithm(fn, clicks - 1, gridState, updateGrid)
  }

  useEffect(() => {
      function handleResize() {
        // Call your function here
        const gridHeight = 200;
        updateGridDimension(
          Math.floor(gridHeight / 20),
          Math.ceil(200 / 20)
        );
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [updateGridDimension]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Header />
      <Grid />
      <Legend />
    </div>
  );
}

export default App;
