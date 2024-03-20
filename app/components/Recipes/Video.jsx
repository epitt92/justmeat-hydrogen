import React, { useState } from 'react'

const Video = ({ url, poster, width, height, videoId }) => {
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    const video = document.getElementById(videoId) // Dynamically select the video element by ID
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="relative">
      <video
        id={videoId} // Set the ID of the video element dynamically
        onClick={togglePlay}
        poster={poster}
        width={width}
        height={height}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 cursor-pointer ${
          playing ? 'bg-black' : 'bg-black hover:bg-blue-500'
        }`}
        onClick={togglePlay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#fff" // Set fill color to white
        >
          {playing ? (
            <path d="M8 19h-4V5h4v14zm4-14v14h4V5h-4z" />
          ) : (
            <path d="M5 3l14 9-14 9V3z" />
          )}
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </div>
  )
}

export default Video
