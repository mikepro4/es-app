import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { change } from 'react-final-form';
import { H5, Slider, Switch, Icon } from '@blueprintjs/core';
import ReactSlider from "react-slider";
import classnames from 'classnames';
import { use } from 'passport';

const SliderComponent = ({ label, input, meta, sliderMin, formApi, sliderMax, stepSize, labelStepSize, incrementStep, resetValue, setFormValueExternally }) => {
    const dispatch = useDispatch();
    const [clickActive, setClickActive] = useState(false);

    const [internalValue, setInternalValue] = useState(0);

    // let currentValue = useRef(Number(input.value));


    const changeValue = (value) => {
        setFormValueExternally(input.name, value);
    };

    useEffect(() => {
        console.log(input.value)
        // setInternalValue(input.value);
    }, [input.value]);

    // Remaining logic for calculating width, handling mouse events, setMin, setMax, add, subtract, setMid, setPercent, resetValue...
    // These will be similar to your class component methods, but converted to use useState and callbacks.

    return (
        <div className="input-container slider-container">
            <div className="input-label">
                {label}
            </div>
            <div className="input-right">
                <div className="control-container">
                    <div className="control-input">
                        <div style={{ display: "none" }}>
                            <input />
                        </div>
                        {/* <Slider
                            min={sliderMin}
                            max={sliderMax}
                            stepSize={stepSize || 0.5}
                            labelStepSize={labelStepSize}
                            value={input.value}
                            onChange={(value) =>  {
                                console.log(value)
                                input.onChange(value)
                                formApi.change(input.name, value);
                            }}
                            // showTrackFill={input.value !== 0}
                            // onRelease logic as needed
                        /> */}



                        <ReactSlider
                            markClassName="example-mark"
                            onChange={input.onChange}
                            defaultValue={0}
                            {...input}
                            value={input.value}
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
                        />
                        <div className="action-container">
                            {/* Action Buttons */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderComponent;
