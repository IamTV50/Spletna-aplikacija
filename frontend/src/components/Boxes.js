import { useState, useEffect } from 'react';
import Box from './Box';

function Boxes(){
    const [boxes, setBoxes] = useState([]);
    useEffect(function(){
        const getBoxes = async function(){
            const res = await fetch("http://localhost:3001/box");
            const data = await res.json();
            setBoxes(data);
        }
        getBoxes();
    }, []);

    return(
        <div>
            <h3>Boxes:</h3>
            <ul>
                {boxes.map(box=>(<Box box={box} key={box._id}></Box>))}
            </ul>
        </div>
    );
}

export default Boxes;