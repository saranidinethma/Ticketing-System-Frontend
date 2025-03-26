import React, { useEffect, useState } from 'react';
import { getLogs } from '../api';

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const data = await getLogs();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setLogs(data);
            } else {
                console.error("Fetched logs are not in an array format:", data);
                setLogs([]); // Reset logs to an empty array on error
            }
        };

        fetchLogs();
        const intervalId = setInterval(fetchLogs, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>System Logs</h2>
            <pre>
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))
                ) : (
                    <div>No logs available.</div>
                )}
            </pre>
        </div>
    );
};

export default LogDisplay;