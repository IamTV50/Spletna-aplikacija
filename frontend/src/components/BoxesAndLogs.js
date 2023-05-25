import React, { useState, useEffect } from 'react';
import Boxes from './Boxes';
import Logs from './Logs';
import Cookies from 'js-cookie';

function BoxesAndLogs() {
  const [logs, setLogs] = useState([]);
  return (
    <div className="boxes-logs-container">
      <div className="boxes-container">
        <Boxes />
      </div>
      <div className="logs-container">
        <Logs logs={logs} />
      </div>
    </div>
  );
}

export default BoxesAndLogs;
