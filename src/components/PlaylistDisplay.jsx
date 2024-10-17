/* eslint-disable react/prop-types */
// src/components/PlaylistDisplay.jsx
const PlaylistDisplay = ({ playlist, prompt }) => {
    return (
        <div>
            <h3 className="playlist-name">{prompt}</h3>
            <ul>
                {playlist.map((song, index) => (
                    <li key={index}>
                        <strong>{song.title}</strong> by {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistDisplay;
