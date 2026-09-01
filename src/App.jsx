import { useRef, useState } from "react";
import "./index.css";

const VIDEOS = [
  { id: "01", src: "/videos/01.mp4", title: "VIDEO 01" },
  { id: "02", src: "/videos/02.mp4", title: "VIDEO 02" },
  { id: "03", src: "/videos/03.mp4", title: "VIDEO 03" },
  { id: "04", src: "/videos/04.mp4", title: "VIDEO 04" },
];

export default function App() {
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
  const [playing, setPlaying] = useState(false);

  async function handleVideo(video) {
    const player = videoRef.current;
    if (!player) return;

    if (activeVideo.id === video.id) {
      if (player.paused) {
        try {
          await player.play();
        } catch (error) {
          console.error("Video playback failed:", error);
        }
      } else {
        player.pause();
      }
      return;
    }

    player.pause();
    setPlaying(false);
    setActiveVideo(video);
  }

  return (
    <main className="page">
      <div className="background-light" />
      <div className="floor-light" />

      <header className="top-left">
        <h1>QUATTRO VIDEO QUOTIDIANI</h1>
        <p>INSTALLAZIONE AUDIOVISIVA · 4 SPAZI</p>
      </header>
      <div className="top-right">
        <p>SCEGLI UNO SPAZIO</p>
        <span>GUARDA · ASCOLTA · SCOPRI</span>
      </div>

      <Curtain className="curtain curtain-left" active={activeVideo.id === "01"} />
      <Curtain className="curtain curtain-right" active={activeVideo.id === "02"} />
      <Curtain className="curtain curtain-back-left" active={activeVideo.id === "03"} />
      <Curtain className="curtain curtain-back-right" active={activeVideo.id === "04"} />
      <Curtain className="curtain curtain-center" />

      <div className="video-space">
        <video
          key={activeVideo.src}
          ref={videoRef}
          className="main-video"
          src={activeVideo.src}
          playsInline
          controls
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          您的浏览器不支持视频播放。
        </video>
      </div>

      {VIDEOS.map((video) => (
        <VideoButton
          key={video.id}
          video={video}
          className={`button-${video.id}`}
          active={activeVideo.id === video.id}
          playing={playing}
          onClick={() => handleVideo(video)}
        />
      ))}

      <div className="video-status">
        <span className={playing ? "dot playing" : "dot"} />
        <span>{activeVideo.id} · {activeVideo.title}</span>
      </div>

      <footer>
        <p>ENTRA NELLA MEMORIA ATTRAVERSO L&apos;IMMAGINE</p>
        <p>{playing ? "VIDEO IN RIPRODUZIONE" : "SELEZIONA 01 — 04"}</p>
      </footer>
    </main>
  );
}

function VideoButton({ video, className, active, playing, onClick }) {
  return (
    <button
      type="button"
      className={`video-button ${className} ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label={`播放 ${video.title}`}
      aria-pressed={active && playing}
    >
      <span>{video.id}</span>
      {active && playing && <span className="pulse-ring" />}
    </button>
  );
}

function Curtain({ className, active = false }) {
  return (
    <div className={`${className} ${active ? "curtain-active" : ""}`} aria-hidden="true">
      {Array.from({ length: 40 }).map((_, index) => (
        <span key={index} className="curtain-line" style={{ left: `${(index / 39) * 100}%` }} />
      ))}
    </div>
  );
}
