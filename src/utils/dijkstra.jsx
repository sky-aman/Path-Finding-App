import { callInInterval } from './util';

export default function dijkstra(totalTargets, start, grid, updateGrid){
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    const distance = new Array(rows).fill(Infinity).map(() => new Array(cols).fill(Infinity));
    const parent = new Array(rows).fill(null).map(() => new Array(cols).fill(null));
    const gridState = JSON.parse(JSON.stringify(grid));
    const queue = [];
    
    distance[start.row][start.col] = 0;
    queue.push(start);
    const intervalLen = 10;
    let i = 0;
    let end = start;

    while (queue.length) {
        i++;
        const current = queue.shift();
        const { row, col } = current;
        if (visited[row][col]) {
            continue;
        }
        if(gridState[row][col] === 'bg-white'){
            gridState[row][col] = 'bg-warning';
            callInInterval(() =>
            {
                document.querySelector(`[row="${row}"][col="${col}"]`).classList.remove('bg-white');
                document.querySelector(`[row="${row}"][col="${col}"]`).classList.add('bg-warning');
            }, intervalLen * i);
        }

        visited[row][col] = true;
    
        if (gridState[row][col].includes('bg-danger')) {
            end = {row, col};
            gridState[row][col] = 'bg-danger foundTarget';
            callInInterval(() =>
            {
                document.querySelector(`[row="${row}"][col="${col}"]`).classList.add('foundTarget');
            }, intervalLen * i);
            break;
        }
    
        const neighbors = [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 }
        ];

        neighbors.forEach(neighbor => {
            const { row, col } = neighbor;
            if (row < 0 || row >= rows || col < 0 || col >= cols) {
                return;
            }
    
            if (gridState[row][col].includes("bg-dark")) {
                return;
            }
    
            const newDistance = distance[current.row][current.col] + 1;
            if (newDistance < distance[row][col]) {
                distance[row][col] = newDistance;
                parent[row][col] = current;
                queue.push(neighbor);
            }
        });
    }

    const path = [];
    let current = end;
    while (current) {
        const {row, col} = current;
        i++;
        if(gridState[row][col] === 'bg-warning'){
            gridState[row][col] = 'bg-primary';
            callInInterval(() =>
            {
                document.querySelector(`[row="${row}"][col="${col}"]`).classList.remove('bg-white', 'bg-warning');
                document.querySelector(`[row="${row}"][col="${col}"]`).classList.add('bg-primary');
            }, intervalLen * i);
        }
        path.push(current);
        current = parent[current.row][current.col];
    }
    
    callInInterval(() =>
    {
        updateGrid(gridState);
    }, intervalLen * i);
}