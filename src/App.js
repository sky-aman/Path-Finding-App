import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Grid } from './component/Grid';
import Header from './component/Header';
import breadthFirstSearch from './utils/breadthFirstSearch';
import depthFirstSearch from './utils/depthFirstSearch';
import dijkstra from './utils/dijkstra';
import createRandomWalls from './utils/createRandomWalls';

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
  const [gridSize, setgridSize] = useState(0);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [gridState, setGridState] = useState([]);
  const [clicks, setClicks] = useState(0);
  
  useEffect(() =>
  {
    const gridRow = [];
    for (let i = 0; i < rows; i++)
    {
      const gridColumn = [];
      for (let j = 0; j < cols; j++)
      {
        gridColumn.push('bg-white');
      }
      gridRow.push(gridColumn);
    }
    setGridState(gridRow);
  },
    [rows, cols]);
  
  /**
   * Updates the color of the tile at position i,j to the given background color.
   * 
   * @param {number} i The row index of the tile to update
   * @param {number} j The column index of the tile to update
   * @param {string} bg The background color to set the tile to
   */
  function updateTileColor (i, j, bg)
  {
    const newGridState = JSON.parse(JSON.stringify(gridState));
    newGridState[i][j] = bg;
    setGridState(newGridState);;
  }

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
   * Resets the entire grid to the default state of all white tiles.
   */
  function resetGrid ()
  {
    const newGridState = JSON.parse(JSON.stringify(gridState));
    for (let i = 0; i < newGridState.length; i++)
    {
      for (let j = 0; j < newGridState[0].length; j++)
      {
        newGridState[i][j] = 'bg-white';
      }
    }
    setGridState(newGridState);
    setClicks(0);
  }

  /**
  Update the dimensions of the grid.
  @param {number} gridSize - The size of the grid in pixels.
  @param {number} rows - The number of rows in the grid.
  @param {number} cols - The number of columns in the grid.
  */
  function updateGridDimension (gridSize, rows, cols)
  {
    setgridSize(gridSize);
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
      case 'bfs': fn = breadthFirstSearch; break;
      case 'dfs': fn = depthFirstSearch; break;
      case 'dks': fn = dijkstra; break;
      default: return;
    }
    applyAlgorithm(fn, clicks - 1, gridState, updateGrid)
  }
  const createWalls = () =>  createRandomWalls(gridState, updateGrid);
  return (
    <Container fluid style={{padding: 0}}>
      <Header updateGridDimension={updateGridDimension} resetGrid={resetGrid} clicks={clicks} onStartAlgo={onStartAlgo} createWalls={createWalls}/>
      <Container style={{ height: `${gridSize || 0}px`}} fluid>
        <Row>
          <Col>
            <Grid gridState={gridState} updateTileColor={updateTileColor} clicks={clicks} setClicks={setClicks} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
