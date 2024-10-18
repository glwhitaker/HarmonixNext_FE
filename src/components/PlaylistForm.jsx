// src/components/PlaylistForm.jsx
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const PlaylistForm = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(prompt);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a mood or theme . . ."
                rows="4" // This controls the height in terms of visible lines
                required
            />
            <button type="submit">Generate Playlist</button>
        </form>

    );
};

export default PlaylistForm;
