import { useState, useEffect } from 'react';
import Box from './Box';
import Cookies from 'js-cookie';



function Boxes() {
  const [boxes, setBoxes] = useState([]);
  const neke = Cookies.get("uporabnik");

  function getBoxes() {
    //var neke = Cookies.get("uporabnik")
    console.log(neke)
    fetch(`http://localhost:3001/box/my_boxes/${neke}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the fetched data in the console
        setBoxes(data);
        return data
      })
      .catch((err) => {
        console.log("juhu");
        console.log(err);
      });
  }
  

  useEffect(() => {
    getBoxes();
    //setBoxes(data)
  }, [neke]);

  return (
    <div>
    <h3>Boxes:</h3>
      <ul>
        {boxes.map((box) => (
          <>
          <Box box={box.name} box_id={box.boxId} key={box._id}></Box></>
        ))}
      </ul>
  </div>
  );
}

export default Boxes;
