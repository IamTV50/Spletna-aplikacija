import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditBoxForm() {
    const navigate = useNavigate();
    const location = useLocation();
  const [name, setName] = useState('');
  const [boxId, setBoxId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        //console.log(props.box_id)
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
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Box ID:
        <input type="text" value={boxId} onChange={(e) => setBoxId(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditBoxForm;
