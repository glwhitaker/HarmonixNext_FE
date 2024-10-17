// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if using a different port or hosting

// OpenAI API call
export const generatePlaylist = async (prompt) => {
    try {
        const response = await axios.post(`${API_URL}/generate-playlist`, { prompt });
        return response.data.playlist;
    } catch (error) {
        console.error("Error generating playlist:", error);
        throw error;
    }
};

// Spotify: Fetch user data
export const fetchSpotifyUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/spotify/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Spotify user:", error);
        throw error;
    }
};
