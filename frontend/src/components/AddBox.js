import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddBox(props){
    const [name, setName] = useState('');
    const [boxId, setId] = useState('');
    const userContext = useContext(UserContext); 

    async function onSubmit(e){
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
        if(data._id !== undefined){
            window.location.href="/";
        }
    }

    

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <input type="text" className="form-control" name="name" placeholder="Ime paketnika" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" className="form-control" name="boxId" placeholder="Id od paketnika" value={boxId} onChange={(e)=>{setId(e.target.value)}}/>
            <input className="btn btn-primary" type="submit" name="submit" value="Dodaj" />
        </form>
    )
}

export default AddBox;