import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

// Import your audio file

function AyahAudio(props) {
  const { url } = props
  return (
    <>
      <ReactAudioPlayer src={url} autoPlay={false} controls />
    </>
  )
}

export default AyahAudio
