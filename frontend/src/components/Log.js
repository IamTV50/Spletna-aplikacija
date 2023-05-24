import React from 'react';

function Log({ user, opend, boxId }) {
  return (
    <div className='card mb-2' style={{ width: "100%"}}>
        <div className='card-body'>
            <div className="log-entry">
                <p>User: {user}</p>
                <p>Opened: {opend}</p>
                <p>Box ID: {boxId}</p>
            </div>
        </div>
    </div>
  );
}

export default Log;