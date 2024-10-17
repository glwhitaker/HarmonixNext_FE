// src/components/PlaylistGenerator.jsx
import { useState } from 'react';
import PlaylistForm from './PlaylistForm';
import PlaylistDisplay from './PlaylistDisplay';
import { generatePlaylist } from '../services/api';
import './PlaylistGenerator.css';

function PlaylistGenerator({ username }) {
    const [playlist, setPlaylist] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleGeneratePlaylist = async (prompt) => {
        setLoading(true); // Start loading
        try {
            const generatedPlaylist = await generatePlaylist(prompt);
            setPlaylist(generatedPlaylist);
            setPrompt(prompt);
        } catch (error) {
            console.error("Failed to generate playlist:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h2>Welcome, {username}</h2>
            <h1>Harmonix Playlist Generator</h1>
            <PlaylistForm onGenerate={handleGeneratePlaylist} />
            {loading ? (
                <div className="spinner"></div> // Simple loading message or spinner
            ) : (
                playlist.length > 0 && <PlaylistDisplay playlist={playlist} prompt={prompt} />
            )}
        </div>
    );
}

export default PlaylistGenerator;
