import React from 'react';

function Log({ user, opend, boxId, force }) {
  return (
    <div className="card mb-2" style={{ width: '100%' }}>
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
