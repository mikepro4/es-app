import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button"
import ParamSwitch from "@/components/paramSwitch";

import { toggleDrawer, generatorSearch, updateCollection, setIsPlaying } from "@/redux";
import { set } from "lodash";

import { 
    toggleParamsValues,
    generatorItem
} from "@/redux";

function AppSettings(props) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const player = useSelector((state) => state.audioPlayer);
    const router = useRouter();
    const [generator, setGenerator] = useState();
    const dispatch = useDispatch();
    const [generators, setGenerators] = useState([]);
    const [status, setStatus] = useState("stopped");
    const [timeInterval, setTimeInterval] = useState(null);
    const [fullGenerator, setFullGenerator] = useState({});
    const currentIterationRef = useRef(0);
    const [prevPlayerIsPlaying, setPrevPlayerIsPlaying] = useState(false);
    const [internalPlay, setInternalPlay] = useState(false)

    const resetAnimation = () => {
        setStatus("stopped");
        currentIterationRef.current = 0
        clearInterval(timeInterval);
        setTimeInterval(null);
        dispatch(toggleParamsValues(app.playerData.params));
        dispatch(setIsPlaying(false))
    }


    useEffect(() => {
        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        };
    }, [timeInterval]);

    useEffect(() => {
        if (player.isPlaying && status !== "play") {
            if(!internalPlay) {
                setStatus("play");
                // If there's no interval set, start one
                if (!timeInterval && fullGenerator && fullGenerator.params) {
                    const intervalId = setInterval(() => {
                        // Update the current iteration
                        currentIterationRef.current += 1;
                        // Perform the update values action
                        updateValues();
                    }, fullGenerator?.params?.iterationGap);
                    // Store the interval ID so it can be cleared later
                    setTimeInterval(intervalId);
                }
            } else {
                setInternalPlay(false)
            }
        } else if (!player.isPlaying && status == "play" && !internalPlay) {
            setStatus("paused");
            setInternalPlay(false)
            // If the player is not playing, clear the interval
            if (timeInterval) {
                clearInterval(timeInterval);
                setTimeInterval(null);
            }
        }
        // Update the previous player playing state
        setPrevPlayerIsPlaying(player.isPlaying);
        // Cleanup interval on unmount or if player.isPlaying changes
        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        };
    }, [player.isPlaying, status, timeInterval, updateValues, internalPlay]);
 

    useEffect(() => {
        dispatch(generatorItem({
            id: generator,
            callback: (data) => {
                setFullGenerator(data)
                resetAnimation()
            }
        }))
    }, [generator])


    const generateValue = (values, item, i) => {
        if(item.paramType == "step") {

            return Number(values[item.paramName]) + Number(item.stepAmount)*i
        }
    }

    const updateValues = useCallback(() => {
        if (fullGenerator) {
            const paramsObject = fullGenerator?.params?.list.reduce((acc, item, index) => {
                acc[item.paramName] = generateValue(app.playerData.params, item, currentIterationRef.current);
                return acc;
            }, {});
    
            let newParams = {
                ...app.playerData.params,
                ...paramsObject
            };
            dispatch(toggleParamsValues(newParams));
            console.log(newParams);
        }
    }, [fullGenerator, app.playerData, dispatch, currentIterationRef.current]); 

    // useEffect(() => {
    //     if(currentIterationRef.current = 0) {
    //         updateValues()
    //     }
    // }, [currentIterationRef.current]);

    useEffect(() => {
        searchGenerators()

        return () => {
            
        };
    }, []); 

    useEffect(() => {
        if(app.updateCollection ) {
            searchGenerators()
            dispatch(updateCollection(false))
        }
       
        return () => {
        };
    }, [app.updateCollection]); 

    const searchGenerators = (doSelect) => {
        dispatch(
            generatorSearch({
                criteria: {},
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: 1,

                callback: (data) => {
                    let finalOptions = data.all.map((option) => {
                        return {
                            value: option._id,
                            label: option.name,
                        };
                    });
                    setGenerators(finalOptions);
                    setGenerator(finalOptions[0]?.value)
                    setFullGenerator(data.all[0])
                },
            })
        );
    }

    const togglePlay = useCallback(() => {
        if (status !== "play") {
            setInternalPlay(true)
            setStatus("play");
            
            const intervalId = setInterval(() => {
                currentIterationRef.current = currentIterationRef.current + 1;
                updateValues();
            }, fullGenerator.params.iterationGap);
            setTimeInterval(intervalId);
        } else {
            setInternalPlay(false)
            setStatus("paused");
            if (timeInterval) {
                clearInterval(timeInterval);
                setTimeInterval(null);
            }
        }
    }, [status, timeInterval, updateValues]); 

    let icon

    if (status == "play") {
        icon = "pause"
    } else {
        icon = "play"
    }

    return (
        <div className="generator-container">
            <ul className="generator-content">
                <li>
                    {generator && generators && generators.length > 0 &&<ParamSwitch
                        display="label"
                        intent={"neutral"}
                        value={generator}
                        valueFromLabel={true}
                        offset={[-10, 0]}
                        position="bottom left"
                        params={[
                            {
                                type: "links",
                                values: generators
                            }
                        ]}
                        onChange={(value) => {
                            // alert(value)
                            setGenerator(value)
                        }}
                    />}
                </li>
                <li>
                    <Button 
                        icon={icon}
                        minimal={true}
                        small={true}
                        offset={1}
                        onClick={() => {
                            togglePlay()
                        }}
                    />
                </li>

                <li>
                    <Button 
                        icon="stop"
                        minimal={true}
                        small={true}
                        offset={0.5}
                        onClick={(e) => {
                            resetAnimation()
                            e.currentTarget.blur();
                            // dispatch(setIsPlaying(false))
                        }}
                    />
                </li>
                
                <li>
                    <Button 
                        icon="chevron-left"
                        minimal={true}
                        small={true}
                        onClick={() => {
                            let prevIteration
                            if(currentIterationRef.current > 1) {
                                prevIteration = currentIterationRef.current - 1
                            } else{
                                prevIteration = 1
                            }
                            currentIterationRef.current = prevIteration
                            updateValues()
                        }}
                    />
                </li>

                <li>
                    <div className="current-iteration">
                        {currentIterationRef.current}
                    </div>
                </li>

                
                <li>
                    <Button 
                        icon="chevron-right"
                        minimal={true}
                        small={true}
                        offset={1}
                        onClick={() => {
                            currentIterationRef.current = currentIterationRef.current + 1
                            updateValues()
                            // setCurrentIteration(currentIteration + 1);
                        }}
                    />
                </li>

                <li>
                    <Button 
                        icon="edit"
                        minimal={true}
                        small={true}
                        onClick={() => {
                            dispatch(toggleDrawer({
                                drawerOpen: true,
                                drawerType: "generator-settings",
                                drawerData: {
                                    activeItem: generator
                                }
                            }));
                        }}
                    />
                </li>
                

                
            </ul>
        </div>
    );
}

export default AppSettings;
