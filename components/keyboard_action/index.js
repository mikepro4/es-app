import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { toggleParamsValues } from '@/redux';

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const keyboard = useSelector((state) => state.keyboard);
    const router = useRouter();
    const dispatch = useDispatch();
    const intervalRef = useRef(null);
    const shiftEnabledRef = useRef(false);

    // Function to determine what action to dispatch based on the last key pressed

    const determineAction = useCallback((key) => {

        let paramsData
        let paramsValues
    
        if(app.playerData?.algo) {
            paramsData = app.playerData.algo
        } else if (app.paramsData) {
            paramsData = app.paramsData
        }
    
        if(app.playerData?.params && !app.paramsValues) {
            paramsValues = app.playerData?.params
        } else if (app.paramsValues) {
            paramsValues = app.paramsValues
        }

        if (paramsData?.inputs && paramsData?.inputs[key] && paramsData?.inputs[key].param) {
            const inputConfig = paramsData?.inputs[key];
            if (inputConfig && inputConfig.param) {
                const currentParamValue = paramsValues[inputConfig.param];
                let nextValue;
    
                switch (inputConfig.paramType) {
                    case "nextSwitch":
                    case "prevSwitch":
                        const paramOptions = paramsData.params.find(p => p.value === inputConfig.param)?.enumParameters;
                        if (paramOptions) {
                            const currentIndex = paramOptions.findIndex(option => option.value === currentParamValue);
                            let finalIndex = 0;
                            if (inputConfig.paramType === "nextSwitch") {
                                finalIndex = (currentIndex + 1) % paramOptions.length;
                            } else if (inputConfig.paramType === "prevSwitch") {
                                finalIndex = (currentIndex - 1 + paramOptions.length) % paramOptions.length;
                            }
                            nextValue = paramOptions[finalIndex].value;
                        }
                        break;
                    case "increment":
                    case "decrement":

                        let stepValue 
                        console.log("shiftEnabled", shiftEnabledRef.current)

                        if(shiftEnabledRef.current && inputConfig.paramShiftStepValue) {
                            stepValue = inputConfig.paramShiftStepValue
                        } else {
                            stepValue = inputConfig.paramStepValue || 1; // Default step is 1 if not specified
                        }
                        const valueAsNumber = Number(currentParamValue);
                        if (!isNaN(valueAsNumber)) {
                            nextValue = inputConfig.paramType === "increment"
                                ? (valueAsNumber + Number(stepValue))
                                : (valueAsNumber - Number(stepValue));
                        }
                        break;
                    default:
                        // Handle other paramTypes or throw an error
                        console.error(`Unhandled paramType: ${inputConfig.paramType}`);
                        return;
                }
    
                if (nextValue !== undefined) {
                    return dispatch(toggleParamsValues({
                        ...paramsValues,
                        [inputConfig.param]: nextValue
                    }));
                }
            }
        }
    }, [app.playerData, app.paramsData, app.paramsValues, dispatch]);

    const startAction = useCallback((key) => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                determineAction(key);
            }, 1);
        }
    }, [determineAction]);

    const stopAction = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);


    useEffect(() => {
        return () => {
            stopAction();
        };
    }, [stopAction]);

    useEffect(() => {
        let lastKey = keyboard.activeKeys[keyboard.activeKeys.length - 1];
        if (lastKey) {
            if(lastKey === "SHIFT") {
                shiftEnabledRef.current = true;
            }else if(lastKey === "META") {
                shiftEnabledRef.current = true;
            } else {
                startAction(lastKey);
            }
        } else {
            stopAction();
            shiftEnabledRef.current = false;
        }
        // Cleanup action when the key changes
        return () => stopAction();
    }, [keyboard, startAction, stopAction]);

    return (
       <></>
    );
}

export default AppSettings;
