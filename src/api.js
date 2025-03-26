import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:8080/tickets';

/**
 * Fetch the current ticket status from the server.
 * @returns {Promise<string>} The ticket status or an error message.
 */
export const getTicketStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/status`);
        return response.data; // Assuming the response is in a readable format
    } catch (error) {
        console.error("Failed to fetch ticket status:", error);
        return "Error fetching ticket status."; // Return a user-friendly message
    }
};

/**
 * Start the ticketing process on the server.
 */
export const startTicketing = async (numberOfVendors, vendorReleaseRate, numberOfCustomers, customerRetrievalRate) => {
    try {
        await axios.post(`${API_URL}/start`, {
            numberOfVendors,
            vendorReleaseRate,
            numberOfCustomers,
            customerRetrievalRate
        });
        console.log("Ticketing process started successfully.");
    } catch (error) {
        console.error("Failed to start ticketing:", error);
    }
};

/**
 * Stop the ticketing process on the server.
 */
export const stopTicketing = async () => {
    try {
        await axios.post(`${API_URL}/stop`);
        console.log("Ticketing process stopped successfully.");
    } catch (error) {
        console.error("Failed to stop ticketing:", error);
    }
};

/**
 * Fetch logs from the server.
 * @returns {Promise<string>} The logs or an error message.
 */
export const getLogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/logs`);
        return response.data; // Assuming logs are returned in a readable format
    } catch (error) {
        console.error("Failed to fetch logs:", error);
        return "Error fetching logs."; // Return a user-friendly message
    }
};