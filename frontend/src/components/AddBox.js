import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddBox(props) {
  const [name, setName] = useState('');
  const [boxId, setBoxId] = useState('');
  const userContext = useContext(UserContext);

  async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/box', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        boxId: boxId
      })
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/home";
    }
  }

  return (
    <div className="container">
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <h1>Add New Box</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Box Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter box name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="boxId" className="form-label">Box ID</label>
          <input type="text" className="form-control" id="boxId" placeholder="Enter box ID" value={boxId} onChange={(e) => setBoxId(e.target.value)} />
        </div>
        <button type="submit" className="button-28">Add Box</button>
      </form>
    </div>
  )
}

export default AddBox;
