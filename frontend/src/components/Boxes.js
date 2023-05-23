import React, { useState, useEffect } from 'react';
import Box from './Box';
import Cookies from 'js-cookie';

function Boxes() {
  const [boxes, setBoxes] = useState([]);


  useEffect(() => {
    const getBoxes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/box/my_boxes/${neke}`);
        if (response.ok) {
          const data = await response.json();
          setBoxes(data);
        } else {
          console.log('Failed to fetch boxes');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBoxes();
  }, [neke]);



  return (
    <div>
      <h3>Boxes:</h3>
      <ul>
        {boxes.length > 0 ? (
          boxes.map((box) => (
            <React.Fragment key={box._id}>
              <Box
                box={box.name}
                box_id={box._id}
                boxId={box.boxId}
                onRemove={() => handleRemove(box._id)}
              />
              <br />
            </React.Fragment>
          ))
        ) : (
          <p>No boxes found.</p>
        )}
      </ul>
    </div>
  );
}

export default Boxes;
