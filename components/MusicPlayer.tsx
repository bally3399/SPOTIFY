import React, { useState } from 'react';
import { TracksItem } from "@/database.types";

interface MusicPlayerProps {
    tracks: TracksItem[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
    const [currentTrack, setCurrentTrack] = useState<TracksItem | null>(
        tracks && tracks.length > 0 ? tracks[0] : null
    );

    const formatDuration = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, "0")}`;
    };

    const handleTrackSelect = (track: TracksItem): void => {
        setCurrentTrack(track);
    };

    if (!currentTrack) {
        return (
            <div className="music-player bg-black text-white p-4 flex flex-col items-center">
                <p className="text-gray-400">No tracks available to play.</p>
            </div>
        );
    }

    return (
        <div className="music-player bg-black text-white p-4 flex flex-col items-center">
            <div className="flex items-center space-x-4">
                <img
                    src={currentTrack.album.images[1]?.url || ""}
                    alt={currentTrack.name || "Track"}
                    className="w-16 h-16 rounded"
                />
                <div>
                    <h3 className="text-lg font-bold">{currentTrack.name}</h3>
                    <p className="text-sm">
                        {currentTrack.artists.map((artist) => artist.name).join(", ")}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
                <button onClick={() => alert("Previous")}>&lt;</button>
                <button
                    className="px-4 py-2 bg-green-600 rounded"
                    onClick={() => alert("Play/Pause")}
                >
                    Play
                </button>
                <button onClick={() => alert("Next")}>&gt;</button>
            </div>

            <div className="mt-4">
                <p>Duration: {formatDuration(currentTrack.duration_ms)}</p>
                {currentTrack.preview_url ? (
                    <audio controls src={currentTrack.preview_url} className="w-full mt-2">
                        Your browser does not support the audio element.
                    </audio>
                ) : (
                    <p className="text-sm text-gray-400">No preview available</p>
                )}
            </div>

            <div className="track-selector mt-4 w-full">
                {tracks.map((track, index) => (
                    <button
                        key={index}
                        onClick={() => handleTrackSelect(track)}
                        className={`block w-full text-left p-2 hover:bg-gray-700 ${
                            track.id === currentTrack.id ? "bg-gray-800" : ""
                        }`}
                    >
                        {track.name} - {track.artists.map((artist) => artist.name).join(", ")}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MusicPlayer;
