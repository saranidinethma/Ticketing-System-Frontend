import React, { useState } from 'react';
import ConfigurationForm from './components/ConfigurationForm'; 
import './App.css';

const App = () => {
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState('');

  const startTicketing = async (numberOfVendors, vendorReleaseRate, numberOfCustomers, customerRetrievalRate) => {
      try {
          const response = await fetch(`http://localhost:8080/tickets/start?numberOfVendors=${numberOfVendors}&vendorReleaseRate=${vendorReleaseRate}&numberOfCustomers=${numberOfCustomers}&customerRetrievalRate=${customerRetrievalRate}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.text();
          setStatus(data); // Update status with response message
      } catch (error) {
          console.error('Error starting ticketing:', error);
      }
  };

  const stopTicketing = async () => {
      try {
          const response = await fetch('http://localhost:8080/tickets/stop', { method: 'POST' });
          const data = await response.text();
          setStatus(data); // Update status with response message
      } catch (error) {
          console.error('Error stopping ticketing:', error);
      }
  };

  const fetchLogs = async () => {
      try {
          const response = await fetch('http://localhost:8080/tickets/logs');
          const data = await response.text();
          setLogs(data); // Update logs with response message
      } catch (error) {
          console.error('Error fetching logs:', error);
      }
  };

  return (
    <div className="app-container">
        <h1>Real-Time Ticketing System</h1>
        <div className="configuration-form">
            <ConfigurationForm onStart={startTicketing} />
        </div>
        <button onClick={stopTicketing}>Stop Ticketing</button>
        <button onClick={fetchLogs}>Fetch Logs</button>

        <div className="status-section">
            <h2>Status</h2>
            <p className={status.includes('Error') ? 'status-error' : 'status-success'}>{status}</p>
        </div>

        <div className="logs-section">
            <h2>Logs</h2>
            <pre>{logs}</pre>
        </div>
    </div>

  );
};

export default App;