// src/App.jsx
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PlaylistGenerator from './components/PlaylistGenerator';
import './App.css';
import './index.css';
import { fetchSpotifyUser } from './services/api'; // Import Spotify API function

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.search).get('access_token');
        
        if (accessToken) {
            sessionStorage.setItem('spotify_access_token', accessToken);
            window.history.replaceState({}, document.title, '/');
            setIsAuthenticated(true);
            getUserData(accessToken);
        } else if (sessionStorage.getItem('spotify_access_token')) {
            setIsAuthenticated(true);
            getUserData(sessionStorage.getItem('spotify_access_token'));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/spotify/login';
    };

    const getUserData = async (token) => {
        try {
            const userData = await fetchSpotifyUser(token);
            setUsername(userData.display_name);
        } catch (error) {
            console.error('Failed to fetch Spotify user:', error);
        }
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <LandingPage onLogin={handleLogin} />
            ) : (
                <PlaylistGenerator username={username} />
            )}
        </div>
    );
}

export default App;
