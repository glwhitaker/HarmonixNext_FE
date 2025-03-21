import { useState, useEffect } from 'react';
import PlaylistForm from './PlaylistForm';
import PlaylistDisplay from './PlaylistDisplay';
import { generatePlaylist, createSpotifyPlaylist, fetchSpotifyUser, addTracksToSpotifyPlaylist, validateTracks } from '../services/api';
import './PlaylistGenerator.css';

// eslint-disable-next-line react/prop-types
function PlaylistGenerator({ username }) {
    const [rawPlaylist, setRawPlaylist] = useState([]); // Store the raw GPT-generated playlist
    const [validatedPlaylist, setValidatedPlaylist] = useState([]); // Store the Spotify-validated playlist
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [spotifyPlaylistCreated, setSpotifyPlaylistCreated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('spotify_access_token');
        if (accessToken) {
            fetchSpotifyUser(accessToken).then(userData => {
                setUserId(userData.id);
                setProfileUrl(userData.external_urls.spotify);
            }).catch(err => {
                console.error("Failed to fetch user data", err);
            });
        }
    }, []);

    const handleGeneratePlaylist = async (prompt) => {
        setLoading(true);
        setSpotifyPlaylistCreated(false);
        setValidatedPlaylist([]);
        
        try {
            // Step 1: Generate raw playlist with GPT
            const generatedPlaylist = await generatePlaylist(prompt);
            setRawPlaylist(generatedPlaylist);
            setPrompt(prompt);
            
            // Step 2: Validate tracks against Spotify
            const accessToken = sessionStorage.getItem('spotify_access_token');
            const validationResult = await validateTracks(generatedPlaylist, accessToken);
            
            // Step 3: Set the validated playlist
            setValidatedPlaylist(validationResult.playlist);
            
        } catch (error) {
            console.error("Failed to generate or validate playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSpotifyPlaylist = async () => {
        try {
            setLoading(true);
            const accessToken = sessionStorage.getItem('spotify_access_token');
            
            // Create the Spotify playlist
            const spotifyPlaylist = await createSpotifyPlaylist({
                name: `${prompt}`,
                description: `Generated by Harmonix for: ${prompt}`,
                accessToken: accessToken,
                userId: userId
            });
            
            // Add the validated tracks to the playlist
            await addTracksToSpotifyPlaylist(
                spotifyPlaylist.id, 
                validatedPlaylist.map(track => ({ uri: track.uri })), 
                accessToken
            );
            
            setSpotifyPlaylistCreated(true);
            
            // Open the playlist in a new tab
            window.open(spotifyPlaylist.external_urls.spotify, '_blank');
        } catch (error) {
            console.error("Failed to create Spotify playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        sessionStorage.removeItem('spotify_access_token');
        window.location.href = '/';
    };
    
    return (
        <div className="generator">
            <div className="header-info">
                <h2>Welcome, {username}</h2>
                <div className="profile-links">
                    {profileUrl && (
                        <p>
                            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                                View Your Spotify Profile
                            </a>
                        </p>
                    )}
                    <a onClick={handleSignOut}>Sign Out</a>
                </div>
            </div>

            <h1>Harmonix Playlist Generator</h1>
            <PlaylistForm onGenerate={handleGeneratePlaylist} />
            
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Creating your perfect playlist...</p>
                </div>
            ) : (
                <>
                    {validatedPlaylist.length > 0 && (
                        <>
                            {!spotifyPlaylistCreated ? (
                                <>
                                    <PlaylistDisplay 
                                        playlist={validatedPlaylist} 
                                        prompt={prompt} 
                                        showRecommendationBadges={false} 
                                    />
                                    
                                    <button onClick={handleCreateSpotifyPlaylist}>
                                        Add Playlist to Spotify
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="playlist-summary">
                                        <h3>Playlist added to your Spotify account!</h3>
                                    </div>
                                    
                                    <PlaylistDisplay 
                                        playlist={validatedPlaylist} 
                                        prompt={prompt} 
                                        showRecommendationBadges={false} 
                                    />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default PlaylistGenerator;
