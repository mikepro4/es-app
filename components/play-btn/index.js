import React from 'react'
import { Icon } from "@blueprintjs/core";
import classNames from 'classnames';


const PlayBtn = ({ isCurrentTrackPlaying, handlePlay, round }) => {
    return (
        <div className={classNames({ "play_btn": true, "play_btn__round": round })} onClick={() => handlePlay && handlePlay()}>
            <Icon icon={!isCurrentTrackPlaying ? "play" : "pause"} iconSize={20} className={classNames({ "play_btn--icon": round })} />
        </div>
    )
}

export default PlayBtn