import React from 'react'
import { H5, Slider, Switch, } from '@blueprintjs/core';
import PlayBtn from '../play-btn';
import classNames from 'classnames';
import Icon from '../icon';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayPause, togglePlayerControls, setVolume } from '@/redux';


const AudioControls = () => {

    const dispatch = useDispatch()
    const { isPlaying, audioName, playerControls, volume } = useSelector(state => state.audioPlayer)


    return (
        <div className="audio-controls" onClick={e => e.stopPropagation()}>
            <PlayBtn round isCurrentTrackPlaying={isPlaying} handlePlay={() => dispatch(togglePlayPause())} />
            <div className="audio-controls__track-name">
                {audioName}
            </div>

            <Slider min={0}
                max={1}
                value={volume}
                stepSize={0.01}
                vertical
                labelRenderer={false}
                className="audio-controls__slider"
                onChange={(value) => dispatch(setVolume(value))} />
            <div onClick={(e) => { e.stopPropagation(); dispatch(togglePlayerControls()) }} className={classNames({ "timeline-props-icon": true, "timeline-props-icon__active": playerControls, "audio-controls__control-icon": true })}>
                <Icon name="audio-settings" />
            </div>
        </div>
    )
}

export default AudioControls