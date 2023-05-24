import React from 'react';

function Log({ user, opend }) {
  return (
    <div className='card mb-2' style={{ width: "33.33%"}}>
        <div className='card-body'>
            <div className="log-entry">
                <p>User: {user}</p>
                <p>Opened: {opend}</p>
            </div>
        </div>
    </div>
  );
}

export default Log;