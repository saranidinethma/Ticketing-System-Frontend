// src/components/ControlPanel.js
import'./ControllPnael.css';

import React from 'react';

const ControlPanel = ({ onStart, onStop }) => {
    return (
        <div>
            <button onClick={onStart}>Start System</button>
            <button onClick={onStop}>Stop System</button>
        </div>
    );
};

export default ControlPanel;