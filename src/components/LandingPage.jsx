
function LandingPage({ onLogin }) {
    return (
        <div>
            <h1>Harmonix</h1>
            <h2>The Ultimate Music Discovery Tool</h2>
            <p>Embrace the future of music discovery. Let Harmonix generate unqiue Spotify playlists tailored to your mood for the perfect vibe.</p>
            <button onClick={onLogin}>Login with Spotify</button>
        </div>
    );
}

export default LandingPage;
