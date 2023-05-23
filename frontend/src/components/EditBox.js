import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditBoxForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
  const [name, setName] = useState('');
  const [boxId, setBoxId] = useState('');
  const [box_id, setBox_id] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(location.state.boxId)
        console.log(location.state.box_id)
        console.log(props.name)
      const response = await fetch(`http://localhost:3001/box/${location.state.box_id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          boxId: boxId,
        }),
      });
     

      if (response.status === 200) {
        // Editing successful
        console.log('Box edited successfully');
        navigate("/")
        // Redirect to a success page or perform any additional actions
      } else {
        // Editing failed
        console.log('Failed to edit the box');
        // Handle error or display error message to the user
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: 
        <input type="text" placeholder={location.state.name}  value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Box ID:
        <input type="text" placeholder={location.state.boxId} value={boxId} onChange={(e) => setBoxId(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-secondary" >Submit</button>
    </form>
  );
}

export default EditBoxForm;
