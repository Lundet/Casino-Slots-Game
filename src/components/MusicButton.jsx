import React, { useState, useRef } from 'react';
import '../styles/MusicButton.css'; // Import the new CSS file
import audioFile from '../assets/sounds/ageofwar.mp3';

const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (1 = 100%)
  const audioRef = useRef(new Audio(audioFile)); // Use the imported audio file

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.loop = true;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Update the audio volume
  };

  return (
    <div className="music-controls">
      <button onClick={toggleMusic} className="music-button">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};

export default MusicButton;