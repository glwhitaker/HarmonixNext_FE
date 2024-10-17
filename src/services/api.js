// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if using a different port or hosting

export const generatePlaylist = async (prompt) => {
    try {
        const response = await axios.post(`${API_URL}/generate-playlist`, { prompt });
        return response.data.playlist;
    } catch (error) {
        console.error("Error generating playlist:", error);
        throw error;
    }
};
