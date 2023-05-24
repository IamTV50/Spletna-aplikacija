import React from 'react';
import Boxes from './Boxes';
import Logs from './Logs';

function BoxesAndLogs() {
  return (
    <div className="boxes-logs-container">
      <div className="boxes-container">
        <Boxes />
      </div>
      <div className="logs-container">
        <Logs />
      </div>
    </div>
  );
}

export default BoxesAndLogs;
