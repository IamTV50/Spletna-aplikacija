import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditBoxForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [boxId, setBoxId] = useState(location.state.boxId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        navigate("/home")
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
    <div className="d-flex justify-content-center">
    <form onSubmit={handleSubmit} className="col-md-6">
    <h1>Edit Box:</h1>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="boxId">Box ID:</label>
        <input type="text" className="form-control" id="boxId" value={boxId} onChange={(e) => setBoxId(e.target.value)} />
      </div>
      <button type="submit" className="button-28">Submit</button>
    </form>
  </div>
  
  );
}

export default EditBoxForm;
