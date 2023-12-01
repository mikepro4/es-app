
import React from 'react'
import AudioPlayer from '@/components/audio_player/index'

const AudioPlayerWrapper = () => {

  const tracksJson = [
    // { id: 1, uri: "https://blue-peaceful-squirrel-324.mypinata.cloud/ipfs/QmXDrZcEY3y1XPLyTFED1kG6P7nDGJnGxa8Zritbosoyhp?_gl=1*yhxeeg*_ga*MTEyMTE0NzQ5NC4xNzAxNDAwMTQz*_ga_5RMPXG14TE*MTcwMTQwMDE0My4xLjEuMTcwMTQwMDQ4NC41Ni4wLjA." },
    // { id: 2, uri: "https://blue-peaceful-squirrel-324.mypinata.cloud/ipfs/QmXDrZcEY3y1XPLyTFED1kG6P7nDGJnGxa8Zritbosoyhp?_gl=1*yhxeeg*_ga*MTEyMTE0NzQ5NC4xNzAxNDAwMTQz*_ga_5RMPXG14TE*MTcwMTQwMDE0My4xLjEuMTcwMTQwMDQ4NC41Ni4wLjA." },
    // { id: 3, uri: "https://blue-peaceful-squirrel-324.mypinata.cloud/ipfs/QmXDrZcEY3y1XPLyTFED1kG6P7nDGJnGxa8Zritbosoyhp?_gl=1*yhxeeg*_ga*MTEyMTE0NzQ5NC4xNzAxNDAwMTQz*_ga_5RMPXG14TE*MTcwMTQwMDE0My4xLjEuMTcwMTQwMDQ4NC41Ni4wLjA." },
    // { id: 4, uri: "https://blue-peaceful-squirrel-324.mypinata.cloud/ipfs/QmXDrZcEY3y1XPLyTFED1kG6P7nDGJnGxa8Zritbosoyhp?_gl=1*yhxeeg*_ga*MTEyMTE0NzQ5NC4xNzAxNDAwMTQz*_ga_5RMPXG14TE*MTcwMTQwMDE0My4xLjEuMTcwMTQwMDQ4NC41Ni4wLjA." },
    { id: 2, uri: "https://a0815e45c470abdad32bb79a489e88d2.ipfscdn.io/ipfs/QmQaL7Q7MxFMo9JUSx1LKByJHXdcX1fN8vbpwJtvn6L6mL/NGC_129.mp3" },
    { id: 3, uri: "https://p.scdn.co/mp3-preview/f2e134559488a679f6e6177cc753c54314d3b5c5?cid=2c80efaa731345e5adc70453f81b892c" },
    { id: 4, uri: "https://p.scdn.co/mp3-preview/14855c580cce9c934031c223ac452fbd091ef5d4?cid=2c80efaa731345e5adc70453f81b892c" },
  ]
  return (
    <div className="ui-screen page-wrapper">
      <div className="page-container">
        <AudioPlayer links={tracksJson} />

      </div>
    </div>
  )
}

export default AudioPlayerWrapper

