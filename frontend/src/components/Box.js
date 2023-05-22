
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
            "tokenFormat": 5,
            "latitude": 0,
            "longitude": 0,
            "qrCodeInfo": "string",
            "terminalSeed": 0,
            "isMultibox": false,
            "doorIndex": 0,
            "addAccessLog": true
          }),
        }
      );//Tota še dela
      const data = await response.json();

      const byteCharacters = atob(data.data);

const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}

const byteArray = new Uint8Array(byteNumbers);

const blob = new Blob([byteArray], {type: 'audio/mpeg'});
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'sound.mp3';
document.body.appendChild(link);
link.click();

    } catch (error) {
      console.error(error);
    }
  };
  const handleRemove = async () => {
  try {
    const response = await fetch(`http://localhost:3001/box/${props.box_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Removal successful
      console.log("Box removed successfully");
      // Redirect to a success page or perform any additional actions
    } else {
      // Removal failed
      console.log("Failed to remove the box");
      // Handle error or display error message to the user
    }
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = async () => {
  try {
    const response = await fetch(`http://localhost:3001/box/${props.box_id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(/* Put your edit data here */),
    });

    if (response.ok) {
      // Editing successful
      console.log("Box edited successfully");
      // Redirect to a success page or perform any additional actions
    } else {
      // Editing failed
      console.log("Failed to edit the box");
      // Handle error or display error message to the user
    }
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
<div className="card mb-2">
  <div className="card-body">
    <h5 className="card-title">{props.box}</h5>
    <button className="btn btn-primary float-end mr-2" onClick={() => handleEdit()}>
      Edit Box
    </button>
    <button className="btn btn-danger float-end" onClick={() => handleRemove()}>
      Remove Box
    </button>
    <button className="btn btn-primary float-end" onClick={() => handleClick()}>
      Open Box
    </button>
  </div>
</div>
</>
  );
}


export default Box;
