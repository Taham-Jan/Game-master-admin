import React, { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  file: File | string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (file) {
      const newSrc = file instanceof File ? URL.createObjectURL(file) : file;
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);
      setAudioSrc(newSrc);

      return () => URL.revokeObjectURL(newSrc);
    }
  }, [file]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => console.log("Playback error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [file]);

  return (
    <div className="audio-player">
      <button className="audio-play-button" onClick={togglePlayPause}>
        {isPlaying ? (
          <img src="/images/categories/sound-play-icon.png" />
        ) : (
          <img src="/images/categories/sound-play-icon.png" />
        )}
      </button>

      <div className="audio-info">
        <div className="audio-title-wrapper">
          <span className="audio-title">{file.name}</span>
        </div>
        <input
          type="range"
          className="audio-progress"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value);
              setCurrentTime(Number(e.target.value));
            }
          }}
        />
      </div>

      <span className="audio-time">{formatTime(currentTime) || "00:00"}</span>
      {audioSrc && (
        <audio
          style={{ display: "none" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          // controls
          key={audioSrc}
          className="uploaded-media"
          ref={audioRef}
        >
          <source src={audioSrc} type={file.type} />
          Your browser does not support the sound tag.
        </audio>
      )}
      {/* <audio src={file ? URL.createObjectURL(file) : ""} /> */}
    </div>
  );
};

export default AudioPlayer;
