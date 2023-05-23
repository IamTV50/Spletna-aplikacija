import React, { useState } from 'react';
import Log from './Log';
import Cookies from 'js-cookie';

function Logs() {
    const [logs, setLogs] = useState([]);
    const user = Cookies.get('uporabnik');
  
    useEffect(() => {
      const fetchLogs = async () => {
        try {
          const response = await fetch('http://localhost:3001/logs');
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
  
      fetchLogs();
    }, []);
  
    return (
      <div>
        <h3>Logs:</h3>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log) => (
              <Log
                key={log._id}
                user={log.user}
                opend={log.opend}
              />
            ))}
          </ul>
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    );
  }
  
  export default Logs;