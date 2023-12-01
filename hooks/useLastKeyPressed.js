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
                        const stepValue = inputConfig.paramStepValue || 1; // Default step is 1 if not specified
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
    };
    

    if (lastKey) {
        determineAction(lastKey); // Function to determine action based on key
    }


};

export default useLastKeyPressed;
