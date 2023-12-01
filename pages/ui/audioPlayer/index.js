
import React from 'react'
import AudioPlayer from '@/components/audio_player'

const AudioPlayerWrapper = () => {
  return (
    <div className="ui-screen page-wrapper">
      <div className="page-container">
        <AudioPlayer link="https://a0815e45c470abdad32bb79a489e88d2.ipfscdn.io/ipfs/QmQaL7Q7MxFMo9JUSx1LKByJHXdcX1fN8vbpwJtvn6L6mL/NGC_129.mp3" />

      </div>
    </div>
  )
}

export default AudioPlayerWrapper

