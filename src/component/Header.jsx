import React, {useEffect, useRef, useState} from 'react'
import { Navbar, Button, Form, Container } from 'react-bootstrap';

export default function Header ({ updateGridDimension, resetGrid, clicks, onStartAlgo, createWalls })
{
    const [algoSelect, setAlgoSelect] = useState('dks');
    const navbarRef = useRef(null);
    useEffect(() =>
    {
        function handleResize ()
        {
            // Call your function here
            if (navbarRef.current)
            {
                const height = navbarRef.current.clientHeight;
                const gridHeight = window.innerHeight - height;
                updateGridDimension(gridHeight, Math.floor(gridHeight / 24), Math.ceil(window.outerWidth / 23));
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, [updateGridDimension]);

    const handleSelectChange = (event) =>
    {
        setAlgoSelect(event.target.value);
    };

    return (
        <Navbar bg="info" expand="lg" ref={navbarRef}>
            <Container fluid>
                <Navbar.Brand href="#home">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text className="m-0 h-100">Select an algorithm</Navbar.Text>
                    <Form.Select className="w-25 ms-2" value={algoSelect} onChange={handleSelectChange}>
                        <option value="bfs">Breadth First Search</option>
                        <option value="dfs">Depth First Search</option>
                        <option value="dks">Dijkstra Algorithm</option>
                    </Form.Select>
                </Navbar.Collapse>
                <Button variant="primary" onClick={() => createWalls()}>Create walls</Button>
                <Button variant="primary" className={`${clicks < 2 ? 'disabled' : ''} ms-2`} onClick={() => onStartAlgo(algoSelect)}>Run</Button>
                <Button variant="secondary" className="ms-2" onClick={() => resetGrid()}>Reset</Button>
            </Container>
        </Navbar>
  )
}
