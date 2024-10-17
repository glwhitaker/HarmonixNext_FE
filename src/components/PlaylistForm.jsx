// src/components/PlaylistForm.jsx
import { useState } from 'react';

const PlaylistForm = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(prompt);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a mood or theme"
                required
            />
            <button type="submit">Generate Playlist</button>
        </form>
    );
};

export default PlaylistForm;
