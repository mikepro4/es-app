import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { change } from 'react-final-form';
import { H5, Slider, Switch, Icon } from '@blueprintjs/core';
import ReactSlider from "react-slider";
import classnames from 'classnames';
import { use } from 'passport';

import Button from "../button"

const SliderComponent = ({ field, form, stepSize, min, max, step, onChange, displayName, labelStepSize, ...props }) => {

    return (
        <div className="input-container slider-container">
            <div className="input-label">
                {displayName}
            </div>

            <div className="slider-wrapper">
                <div className="slider-ui" style={{  padding: "0 20px"}}>
                    <Slider
                        min={min}
                        max={max}
                        stepSize={step || 0.5}
                        labelStepSize={labelStepSize}
                        value={Number(field.value)}
                        onChange={(value) => { 
                            form.setFieldValue(field.name, value)
                            if(onChange) onChange()
                        }}
                        showTrackFill={Number(field.value) !== 0}
                    />
                </div>

                <div className="slider-actions">

                    <Button
                        small={true}
                        minimal={true}
                        icon="target"
                        type="button"
                        onClick={() => {
                            form.setFieldValue(field.name, 0)
                            if(onChange) onChange()
                        }}
                    />

                    <Button
                        small={true}
                        minimal={true}
                        icon="minus"
                        type="button"
                        onClick={() => {
                            let newValue = Number(field.value) - step;
                            form.setFieldValue(field.name, newValue)
                            if(onChange) onChange()
                        }}
                    />

                    <Button
                        small={true}
                        minimal={true}
                        icon="plus"
                        type="button"
                        onClick={() => {
                            let newValue = Number(field.value) + step;
                            form.setFieldValue(field.name, newValue)
                            if(onChange) onChange()
                        }}
                    />
                </div>

            </div>

            



            {/* <ReactSlider
                {...props}
                markClassName="example-mark"
                onChange={(value) => form.setFieldValue(field.name, value)}
                value={field.value}
                min={-100}
                max={100}
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                marks={[-100, -50, 0, 50, 100]}
                withTracks={true}
                step={0.1}
                renderMark={(props) => {
                    return (
                        <span {...props} >
                            <span className='mark-text'>{props.key}</span>
                        </span>)
                }}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            /> */}
        </div>
    );
};

export default SliderComponent;
