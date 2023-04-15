export default function createRandomWalls(grid, updateGrid){
    const gridState = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < gridState.length; i++){
        for(let j = 0; j < gridState[0].length; j++){
            if(Math.random() < 0.3 && gridState[i][j] === 'bg-white'){
                gridState[i][j] = 'bg-dark';
            }
        }
    }
    updateGrid(gridState);
}