import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { AiFillSound } from "react-icons/ai";

interface VideoPlayerProps {
  file: File | string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (file) {
      const newSrc = file instanceof File ? URL.createObjectURL(file) : file;
      setIsPlaying(false);
      setProgress(0);
      setVideoSrc(newSrc);

      return () => URL.revokeObjectURL(newSrc);
    }
  }, [file]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime =
        (Number(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const volumeValue = Number(event.target.value);
      videoRef.current.volume = volumeValue;
      setVolume(volumeValue);
    }
  };

  return (
    <div className="video-container">
      {videoSrc && (
        <video
          ref={videoRef}
          key={videoSrc}
          className="video"
          onTimeUpdate={handleProgress}
          onClick={handlePlayPause}
          onLoadedMetadata={handleProgress}
          // controls
        >
          <source src={videoSrc} type={file?.type || undefined} />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="controls">
        <button
          className={`video play-pause-btn ${isPlaying ? "playing" : ""}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            ""
          ) : (
            <img src="/images/categories/video-play-icon.png" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="video progress-bar"
        />

        <div className="video volume-control">
          <AiFillSound />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
