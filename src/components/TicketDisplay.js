import React, { useEffect, useState } from 'react';
import { getTicketStatus } from '../api';

const TicketDisplay = () => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchStatus = async () => {
            const data = await getTicketStatus();
            setStatus(data);
        };

        fetchStatus();
        const intervalId = setInterval(fetchStatus, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>Ticket Status</h2>
            <pre>{status}</pre>
        </div>
    );
};

export default TicketDisplay;
