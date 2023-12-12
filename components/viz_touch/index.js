import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { toggleParamsValues, keyDown, keyUp } from "@/redux"

function AppSettings({
    item,
    fullScreen,
    algo
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const appData = useSelector((state) => state.appData);
    const router = useRouter();
    const dispatch = useDispatch();
    const intervalRef = useRef(null);
    const paramsRef = useRef()


    useEffect(() => {
        paramsRef.current = item
        return () => {

        };
    }, [item]);

    const determineAction = useCallback((key, action) => {
        let paramsData
        let paramsValues = paramsRef.current
    
        if(algo) {
            paramsData = appData.algos.find((algo) => algo._id === app.playerData.algo)
        } else if (app.paramsData) {
            paramsData = app.paramsData
        }

        const inputConfig = paramsData?.inputs[key];
        
        let nextValue;

        let stepValue 

       
        stepValue = inputConfig.paramStepValue 
        const currentParamValue = paramsValues[inputConfig.param];
        console.log("currentParamValue", currentParamValue)

        const valueAsNumber = Number(currentParamValue);
        if (!isNaN(valueAsNumber)) {
            nextValue = action === "increment"
                ? (valueAsNumber + Number(stepValue))
                : (valueAsNumber - Number(stepValue));
        }

        if (nextValue !== undefined) {
            return dispatch(toggleParamsValues({
                ...paramsValues,
                [inputConfig.param]: nextValue
            }));
        }


    }, [app.playerData, app.paramsData, app.paramsValues, dispatch, paramsRef.current]);

    const startAction = useCallback((key, action) => {
        console.log('Start Action:', key, action);
        if (!intervalRef.current) {
            determineAction(key, action); // Initial call to set the action in motion immediately
            intervalRef.current = setInterval(() => {
                determineAction(key, action);
            }, 100);
        }
    }, [determineAction, item]);
    
    const stopAction = useCallback(() => {
        console.log('Stop Action');
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    return (
        <div 
            className={classNames("touch-viz-container", {
                "full": fullScreen
            })}
        >
                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-1", "decrement")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-1", "decrement")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-1", "increment")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-1", "increment")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-2", "decrement")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-2", "decrement")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-2", "increment")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-2", "increment")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-3", "decrement")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-3", "decrement")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-3", "increment")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-3", "increment")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-4", "decrement")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-4", "decrement")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>

                <div 
                    className="touch-viz-button"
                    onMouseDown={() => {
                        startAction("touch-row-4", "increment")
                    }}
                    onMouseUp={() => {
                        stopAction()
                    }}

                    onTouchStart={() => {
                        startAction("touch-row-4", "increment")
                    }}
                    onTouchEnd={() => {
                        stopAction()
                    }}
                >
                </div>
        </div>
    );
}

export default AppSettings;
