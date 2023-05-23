import React, { useState, useEffect } from 'react';
import Box from './Box';
import Cookies from 'js-cookie';

function Boxes() {
  const [boxes, setBoxes] = useState([]);
  const neke = Cookies.get('uporabnik');

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

  const handleRemove = async (boxId) => {
    try {
      const response = await fetch(`http://localhost:3001/box/${boxId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Box removed successfully');
        setBoxes(boxes.filter((box) => box._id !== boxId));
      } else {
        console.log('Failed to remove the box');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Boxes:</h3>
      {boxes.length > 0 ? (
        <ul>
          {boxes.map((box) => (
            <React.Fragment key={box._id}>
              <Box
                name={box.name}
                boxId={box.boxId}
                onRemove={() => handleRemove(box._id)}
              />
              <br />
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p>No boxes found.</p>
      )}
    </div>
  );
}

export default Boxes;
