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

export const createSpotifyPlaylist = async ({ name, description, accessToken, userId }) => {
    try {
        const response = await axios.post(`${API_URL}/spotify/create-playlist`, {
            name,
            description,
            accessToken,
            userId, // Send the userId to the backend
        });
        return response.data; // Return the created playlist data
    } catch (error) {
        console.error("Error creating Spotify playlist:", error);
        throw error;
    }
};


export const addTracksToSpotifyPlaylist = async (playlistId, tracks, accessToken) => {
    try {
        const response = await axios.post(`${API_URL}/spotify/add-tracks`, {
            playlistId,
            tracks,
            accessToken,
        });
        return response.data; // Now includes validOriginalTracks and recommendedTracks
    } catch (error) {
        console.error("Error adding tracks to Spotify playlist:", error);
        throw error;
    }
};

// Add a new function to validate tracks
export const validateTracks = async (tracks, accessToken) => {
    try {
        const response = await axios.post(`${API_URL}/validate-tracks`, {
            tracks,
            accessToken,
        });
        return response.data;
    } catch (error) {
        console.error("Error validating tracks:", error);
        throw error;
    }
};
