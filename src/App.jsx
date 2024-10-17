// src/App.jsx
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PlaylistGenerator from './components/PlaylistGenerator';
import './App.css';
import './index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.search).get('access_token');
        
        if (accessToken) {
            sessionStorage.setItem('spotify_access_token', accessToken);
            window.history.replaceState({}, document.title, '/');
            setIsAuthenticated(true);
            fetchSpotifyUser(accessToken);
        } else if (sessionStorage.getItem('spotify_access_token')) {
            setIsAuthenticated(true);
            fetchSpotifyUser(sessionStorage.getItem('spotify_access_token'));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/spotify/login';
    };

    const fetchSpotifyUser = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/spotify/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setUsername(data.display_name);
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
