// src/components/PlaylistGenerator.jsx
import { useState } from 'react';
import PlaylistForm from './PlaylistForm';
import PlaylistDisplay from './PlaylistDisplay';
import { generatePlaylist } from '../services/api';

function PlaylistGenerator({ username }) {
    const [playlist, setPlaylist] = useState([]);
    const [prompt, setPrompt] = useState(''); // State to store the prompt

    const handleGeneratePlaylist = async (prompt) => {
        try {
            const generatedPlaylist = await generatePlaylist(prompt);
            setPlaylist(generatedPlaylist);
            setPrompt(prompt); // Store the prompt used to generate the playlist
        } catch (error) {
            console.error("Failed to generate playlist:", error);
        }
    };

    return (
        <div>
            <h2>Welcome, {username}</h2>
            <h1>Harmonix Playlist Generator</h1>
            <PlaylistForm onGenerate={handleGeneratePlaylist} />
            {playlist.length > 0 && <PlaylistDisplay playlist={playlist} prompt={prompt} />}
        </div>
    );
}

export default PlaylistGenerator;
