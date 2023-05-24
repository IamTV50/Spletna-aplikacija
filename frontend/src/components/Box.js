import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Box(props) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = Cookies.get('uporabnik');

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleClick = async () => {
    try {
      console.log("Neke"+props.box_id)
      const response = await fetch(
        'https://api-d4me-stage.direct4.me/sandbox/v1/Access/openbox',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 9ea96945-3a37-4638-a5d4-22e89fbc998f',
          },
          body: JSON.stringify({
            deliveryId: 0,
            boxId: props.boxId,
            tokenFormat: 5,
            latitude: 0,
            longitude: 0,
            qrCodeInfo: 'string',
            terminalSeed: 0,
            isMultibox: false,
            doorIndex: 0,
            addAccessLog: true,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const byteCharacters = atob(data.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sound.mp3';
        document.body.appendChild(link);
        link.click();

        //dodam entry za log
        const logRes = await fetch(`http://localhost:3001/log`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user, //SHOULD WORK MAYBE?
            opend: new Date(),
            user_id: props.user_id,
            box_id: props.box_id
          }),
        });
        //error checking
        if (logRes.ok) {
          console.log('Log entry created successfuly');
        }else{
          console.log('Failed to create log entry');
        }
      } else {
        console.log('Failed to open the box');
      }
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
        console.log('Box removed successfully');
        props.onRemove(); // Call the parent component's onRemove function to update the state
      } else {
        console.log('Failed to remove the box');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
   /* try {
      const response = await fetch(`http://localhost:3001/box/${props.box_id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Neke',
          boxId: 7,
        }),
      });

      if (response.status === 200) {
        console.log('Box edited successfully');
      } else {
        console.log('Failed to edit the box');
      }
    } catch (error) {
      console.error(error);
    }
    */
   
    navigate('/editBox', { state: { box_id: props.box_id }  });


  };

  return (
    <div className="card mb-2" style={{ width: "33.33%" }}>
      <div className="card-body">
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title">{props.name}</h5>
          <div className="d-flex flex-column">
            <button className="btn btn-primary btn-sm mb-2" onClick={handleClick}>
              Open Box
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleEdit}>
              Edit Box
            </button>
          </div>
        </div>
        <div className="close-container">
          <button type="button" className="close" aria-label="Close" onClick={toggleDeleteModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className={showDeleteModal ? 'modal show d-block' : 'modal'} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Box</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this box?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleDeleteModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={props.onRemove}>
               Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Box;