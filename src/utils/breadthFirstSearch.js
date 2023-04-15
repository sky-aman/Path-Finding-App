import { callInInterval } from './util';

export default function breadthFirstSearch (totalTargets, start, grid, updateGrid)
{
    const {row: sx, col: sy} = start;
    const gridState = JSON.parse(JSON.stringify(grid));
    const range = [[-1, 0], [0, -1], [0, 1], [1, 0]];;
    const queue = [];
    queue.push([sx, sy]);
    const visited = {};
    let i = 0;
    let intervalLen = 25;
    while (queue.length > 0 && totalTargets > 0)
    {
        let [x, y] = queue.shift();
        visited[`${x}-${y}`] = true;
        if (gridState[x][y] === 'bg-danger')
        {
            totalTargets -= 1;
            gridState[x][y] = 'bg-danger foundTarget';
            i += 1;

            callInInterval(() =>
            {
                document.querySelector(`[row="${x}"][col="${y}"]`).classList.add('foundTarget');
            }, intervalLen * i);
        } else if(!(x === sx && y === sy))
        {
            gridState[x][y] = 'bg-warning';
            i += 1;
            callInInterval(() =>
            {
                document.querySelector(`[row="${x}"][col="${y}"]`).classList.remove('bg-white');
                document.querySelector(`[row="${x}"][col="${y}"]`).classList.add('bg-warning');
            }, intervalLen * i);
        }
        for (let r of range)
        {
            const nx = x + r[0];
            const ny = y + r[1];
            if (nx >= 0 && nx < gridState.length && ny >= 0 && ny < gridState[0].length)
            {
                if (!(gridState[nx][ny].includes('bg-warning') || visited[`${nx}-${ny}`] || gridState[nx][ny].includes('bg-dark') || gridState[nx][ny].includes('bg-success') || gridState[nx][ny].includes('foundTarget')))
                {
                    visited[`${nx}-${ny}`] = true;
                    queue.push([nx, ny]);
                }
            }
        }
    }
    callInInterval(() =>
    {
        updateGrid(gridState);
    }, intervalLen * i);
}