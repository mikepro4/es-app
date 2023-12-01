// useLastKeyPressedAction.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { toggleParamsValues } from '@/redux';


const useLastKeyPressed = (dispatch, app, keyboard) => {

    let lastKey = keyboard.activeKeys[keyboard.activeKeys.length - 1];

    // Function to determine what action to dispatch based on the last key pressed

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


    const determineAction = (key) => {
        if (paramsData?.inputs && paramsData?.inputs[key] && paramsData?.inputs[key].param) {
            if (paramsData?.inputs[key].paramType) {
                if (paramsData?.inputs[key].paramType == "nextSwitch" || paramsData?.inputs[key].paramType == "prevSwitch") {
    
                    const inputConfig = paramsData?.inputs[key];
                    if (inputConfig && inputConfig.param) {
                        const currentParamValue = paramsValues[inputConfig.param];
                        const paramOptions = paramsData.params.find(p => p.value === inputConfig.param)?.enumParameters;
    
                        if (paramOptions) {
                            const currentIndex = paramOptions.findIndex(option => option.value === currentParamValue);
                            let finalIndex = 0;
    
                            if (paramsData?.inputs[key].paramType == "nextSwitch") {
                                finalIndex = (currentIndex + 1) % paramOptions.length;
                            } else if (paramsData?.inputs[key].paramType == "prevSwitch") {
                                // Ensure the index wraps around correctly when it goes negative
                                finalIndex = (currentIndex - 1 + paramOptions.length) % paramOptions.length;
                            }
    
                            const nextValue = paramOptions[finalIndex].value;
    
                            return dispatch(toggleParamsValues({
                                ...paramsValues,
                                [inputConfig.param]: nextValue
                            }));
                        }
                    }
                }
            }
        }
    };

    if (lastKey) {
        determineAction(lastKey); // Function to determine action based on key
    }


};

export default useLastKeyPressed;
