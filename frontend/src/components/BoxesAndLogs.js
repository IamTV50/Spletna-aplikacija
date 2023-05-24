import React, { useState, useEffect } from 'react';
import Boxes from './Boxes';
import Logs from './Logs';

function BoxesAndLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs(); // Fetch logs initially
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/log/my_logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.log('Failed to fetch logs');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogAdded = () => {
    fetchLogs(); // Refresh logs after a new log is added
  };

  return (
    <div className="boxes-logs-container">
      <div className="boxes-container">
        <Boxes onLogAdded={handleLogAdded} />
      </div>
      <div className="logs-container">
        <Logs logs={logs} />
      </div>
    </div>
  );
}

export default BoxesAndLogs;
