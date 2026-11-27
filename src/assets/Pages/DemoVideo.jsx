import { useState } from "react";
import "./DemoVideo.css";

// Opción A: video local en /public/demo.mp4 (deja YOUTUBE_ID vacío)
// Opción B: YouTube, solo el ID (lo que va después de "v=")
const YOUTUBE_ID = "OCz7jqsrqRg";
const LOCAL_SRC = "/demo.mp4";
const POSTER = "/demo-poster.png";

function PlayIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="db-demo" id="demo">
      <div className="db-demo-head">
        <h2>Video de demostración</h2>
        <p>Mira cómo funciona MonTrack en menos de 2 minutos</p>
      </div>

      <div className="db-demo-frame">
        {YOUTUBE_ID ? (
          playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
              title="Demo MonTrack"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="db-demo-cover" onClick={() => setPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                alt="Portada del video"
              />
              <span className="db-demo-play">
                <PlayIcon />
              </span>
            </button>
          )
        ) : (
          <video src={LOCAL_SRC} poster={POSTER} controls preload="metadata" />
        )}
      </div>
    </section>
  );
}