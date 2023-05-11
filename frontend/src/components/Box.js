
import React from 'react';
import Boxes from './Boxes';



function Box(props) {
  const handleClick = async () => {
    try {
      const response = await fetch(
        'https://api-d4me-stage.direct4.me/sandbox/v1/Access/openbox',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer 9ea96945-3a37-4638-a5d4-22e89fbc998f'
          },
          body: JSON.stringify({
            "deliveryId": 0,
            "boxId": props.box_id,
            "tokenFormat": 2,
            "latitude": 0,
            "longitude": 0,
            "qrCodeInfo": "string",
            "terminalSeed": 0,
            "isMultibox": false,
            "doorIndex": 0,
            "addAccessLog": true
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(props.box)
  return (
    <>
    <div className="card bg-dark text-dark mb-2">
      <div className="card-img-overlay">
        <h5 className="card-title">{props.box}</h5>
        <button className="btn btn-primary float-end" onClick={()=>handleClick()}>
          Open Box
        </button>
      </div>
    </div></>
  );
}


export default Box;
