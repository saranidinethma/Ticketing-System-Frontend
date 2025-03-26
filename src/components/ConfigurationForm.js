import React, { useState } from 'react';
import './ConfigurationForm.css';

const ConfigurationForm = ({ onStart }) => {
    const [numberOfVendors, setNumberOfVendors] = useState(5);
    const [vendorReleaseRate, setVendorReleaseRate] = useState(10);
    const [numberOfCustomers, setNumberOfCustomers] = useState(5);
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart(
            Number(numberOfVendors), // Convert to number
            Number(vendorReleaseRate), // Convert to number
            Number(numberOfCustomers), // Convert to number
            Number(customerRetrievalRate) // Convert to number
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Configuration</h2>
            <div>
                <label>
                    Number of Vendors:
                    <input
                        type="number"
                        value={numberOfVendors}
                        onChange={(e) => setNumberOfVendors(e.target.value)}
                        min="1"
                    />
                </label>
            </div>
            <div>
                <label>
                    Vendor Release Rate (tickets/second):
                    <input
                        type="number"
                        value={vendorReleaseRate}
                        onChange={(e) => setVendorReleaseRate(e.target.value)}
                        min="1"
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of Customers:
                    <input
                        type="number"
                        value={numberOfCustomers}
                        onChange={(e) => setNumberOfCustomers(e.target.value)}
                        min="1"
                    />
                </label>
            </div>
            <div>
                <label>
                    Customer Retrieval Rate (tickets/second):
                    <input
                        type="number"
                        value={customerRetrievalRate}
                        onChange={(e) => setCustomerRetrievalRate(e.target.value)}
                        min="1"
                    />
                </label>
            </div>
            <button type="submit">Start Ticketing</button>
        </form>
    );
};

export default ConfigurationForm;