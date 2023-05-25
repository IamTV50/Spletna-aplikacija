import React from 'react';

function Log({ user, opend, boxId, force }) {
  const cardStyle = force ? { backgroundColor: '#303036', color :'white' } : { backgroundColor: '#6A8D73', color :'white'};

  return (
    <div className="card mb-2" style={{ ...cardStyle, width: '90%' }}>
      <div className="card-body">
        <div className="log-entry">
          {force && (
            <>
              <p>Time: {opend}</p>
              <p>Box ID: {boxId}</p>
            </>
          )}
          {!force && (
            <>
              <p>User: {user}</p>
              <p>Time: {opend}</p>
              <p>Box ID: {boxId}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Log;
