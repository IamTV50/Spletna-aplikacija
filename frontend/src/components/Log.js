import React from 'react';

function Log({ user, opend }) {
  return (
    <div className="log-entry">
      <p>User: {user}</p>
      <p>Opened: {opend}</p>
    </div>
  );
}

export default Log;