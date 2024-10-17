// src/components/PlaylistDisplay.jsx
const PlaylistDisplay = ({ playlist }) => {
    return (
        <div>
            <h3>Generated Playlist</h3>
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
