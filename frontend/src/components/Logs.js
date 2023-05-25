import React, { useState, useEffect } from 'react';
import Log from './Log';
import Cookies from 'js-cookie';

function Logs() {
  const [logs, setLogs] = useState([]);
  const user = Cookies.get('uporabnik');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/log/my_logs/${user}`);
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
  }, [user]);

  const normalLogs = logs.filter((log) => !log.force);
  const forceLogs = logs.filter((log) => log.force);

  return (
    <div>
      <h3>Logs:</h3>

      {forceLogs.length > 0 && (
        <>
          <h4>Force Logs:</h4>
          <ul>
            {forceLogs.map((log) => (
              <React.Fragment key={log._id}>
                <Log force={log.force} opend={log.opend} boxId={log.boxId} />
                <br />
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {normalLogs.length > 0 && (
        <>
          <h4>Normal Logs:</h4>
          <ul>
            {normalLogs.map((log) => (
              <React.Fragment key={log._id}>
                <Log user={log.user} opend={log.opend} boxId={log.boxId} />
                <br />
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {logs.length === 0 && <p>No logs found.</p>}
    </div>
  );
}

export default Logs;
