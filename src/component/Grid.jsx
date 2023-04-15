import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { getRowColFromElement } from '../utils/util';


export function Grid ({ gridState, updateTileColor, clicks, setClicks })
{
    const [mouseDown, setMouseDown] = useState(false);
    const handleBoxClick = event =>
    {
        const element = event.target;
        if (element.classList.contains('box-item'))
        {
            const [x, y] = getRowColFromElement(element);
            if (gridState[x][y] === 'bg-danger' || gridState[x][y] === 'bg-success'){
                updateTileColor(x, y, 'bg-white');
                setClicks(clicks - 1);
            } else if (clicks === 0)
            {
                updateTileColor(x, y, 'bg-success')
                setClicks(1);
            } else
            {
                updateTileColor(x, y, 'bg-danger')
                setClicks(clicks + 1);
            }
        }
    }
    const handleMouseOver = event =>
    {
        if (event.target.classList.contains('box-item') && mouseDown)
        {
            const [x, y] = getRowColFromElement(event.target);
            updateTileColor(x, y, 'bg-dark');
        }
    }

    const items = [];
    for (let i = 0; i < gridState.length; i++)
    {
        const rowItems = [];
        for (let j = 0; j < gridState[0].length; j++)
        {
            rowItems.push(<div row={i} col={j} key={`${i}-${j}`} className={`box-item ${gridState[i][j]}`} style={{fontSize: "8px"}}></div>);
        }
        items.push(<div key={`${i}`} style={{ height: "23px" }}>{rowItems}</div>);
    }
    return (<Row className='my-2' onClick={handleBoxClick} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} onMouseOver={handleMouseOver} onDragStart={e => e.preventDefault()}>
        <Col>{items}</Col>
    </Row>);
}
