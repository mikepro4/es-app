import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button"
import ParamSwitch from "@/components/paramSwitch";

import { toggleDrawer, generatorSearch, updateCollection, setIsPlaying, galaxySearch, shapeCreateItemWithData } from "@/redux";
import { set } from "lodash";

import { 
    toggleParamsValues,
    generatorItem,
    updateCurrentFrame
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
    const [galaxys, setGalaxys] = useState([]);

    const resetAnimation = () => {
        setStatus("stopped");
        currentIterationRef.current = 0
        clearInterval(timeInterval);
        setTimeInterval(null);
        dispatch(toggleParamsValues(app.playerData.params));
        // dispatch(setIsPlaying(false))
    }

    const getRgbaObject = (value) => {
        let rgbaString

        if( value && value !== "" && value !== false && value !== true) {
            rgbaString = value;
        } else {
            rgbaString = "rgba(255,255,225,1)"
        }
        // console.log("rgbaString", rgbaString)

        const rgbaArray = rgbaString
            .match(/\d+(\.\d+)?/g)
            .map(Number);

        const rgbaObject = {
            r: rgbaArray[0],
            g: rgbaArray[1],
            b: rgbaArray[2],
            a: rgbaArray[3],
        };

        return rgbaObject;
    }



    useEffect(() => {
        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        };
    }, [timeInterval]);

    useEffect (() => {
        if(app.updateCurrentFrame) {
            currentIterationRef.current = app.updateCurrentFrame
            updateValues()
            dispatch(updateCurrentFrame(null))
        }
    }, [app.updateCurrentFrame])

    // useEffect(() => {
    //     if (player.isPlaying && status !== "play") {
    //         if(!internalPlay) {
    //             setStatus("play");
    //             // If there's no interval set, start one
    //             if (!timeInterval && fullGenerator && fullGenerator.params) {
    //                 const intervalId = setInterval(() => {
    //                     // Update the current iteration
    //                     currentIterationRef.current += 1;
    //                     // Perform the update values action
    //                     updateValues();
    //                 }, fullGenerator?.params?.iterationGap);
    //                 // Store the interval ID so it can be cleared later
    //                 setTimeInterval(intervalId);
    //             }
    //         } else {
    //             setInternalPlay(false)
    //         }
    //     } else if (!player.isPlaying && status == "play" && !internalPlay) {
    //         setStatus("paused");
    //         setInternalPlay(false)
    //         // If the player is not playing, clear the interval
    //         if (timeInterval) {
    //             clearInterval(timeInterval);
    //             setTimeInterval(null);
    //         }
    //     }
    //     // Update the previous player playing state
    //     setPrevPlayerIsPlaying(player.isPlaying);
    //     // Cleanup interval on unmount or if player.isPlaying changes
    //     return () => {
    //         if (timeInterval) {
    //             clearInterval(timeInterval);
    //         }
    //     };
    // }, [player.isPlaying, status, timeInterval, updateValues, internalPlay]);
 

    useEffect(() => {
        dispatch(generatorItem({
            id: generator,
            callback: (data) => {
                setFullGenerator(data)
                resetAnimation()
            }
        }))
    }, [generator])

    const randomNumber = (from, to) => {
        var randomnum = (Math.random() * (to - from + from) + from).toFixed(6);
        return randomnum
    }

    const isOdd = (num) => { 
        return (num % 2 == 0);
    }


    const generateValue = (values, item, i) => {
        if(item.paramType == "step") {
            if(item.stepDirection == "forward") {
                return Number(values[item.paramName]) + Number(item.stepAmount)*i
            } else if(item.stepDirection == "backward") {
                return Number(values[item.paramName]) - Number(item.stepAmount)*i
            }
        }

        if(item.paramType == "range") {

            let from = parseFloat(item.fromAmount, 10)
            let to = parseFloat(item.toAmount, 10)
            let delayIterations = parseInt(item.delayIterations, 10)
            let rangeIterations = parseInt(item.rangeIterations, 10)

            let startFrame = delayIterations
            let endframe = delayIterations + rangeIterations
            let difference = to - from
            let step = (difference / rangeIterations).toFixed(6)

            let frame = currentIterationRef.current % rangeIterations

            console.log(from, to, delayIterations, rangeIterations, startFrame, endframe, difference, Number(step), frame)

            if(currentIterationRef.current < endframe) {
                return values[item.paramName] + Number(step) * (currentIterationRef.current - delayIterations)
            } else {
                if(item.rangeBehavior == "loop") {
                    return values[item.paramName]  + Number(step) * frame
                } else if(item.rangeBehavior == "single") {
                    return values[item.paramName] + Number(step) * (rangeIterations)
                } else if(item.rangeBehavior == "bounce") {
                    let test = Math.floor(currentIterationRef.current  / rangeIterations)
                    if(!isOdd(parseInt(test, 10))) {
                        return values[item.paramName] + Number(step) * (rangeIterations - frame) 
                    } else {
                        return values[item.paramName] + Number(step) * (frame + 1)
                    }
                }
            }
        }

        if(item.paramType == "random") {
            return(randomNumber(Number(item.fromAmount), Number(item.toAmount)))
        }
    }

    const updateValues = useCallback(() => {
        console.log(galaxys)
        if (fullGenerator) {
            const paramsObject = fullGenerator?.params?.list.reduce((acc, item, index) => {
                acc[item.paramName] = generateValue(app.playerData.params, item, currentIterationRef.current);
                return acc;
            }, {});


            // const currentGalaxyIndex = currentIterationRef.current % 110;
            // const currentGalaxy = galaxys[currentGalaxyIndex];
            // const galaxyColors = currentGalaxy.image_url.color_summary
            // console.log("current galaxy", currentGalaxy.image_url.color_summary)

            const galaxyColors = [{ color: "1"}, { color: "2"}, { color: "3"}]

            let newColors = galaxyColors.map((color, i) => {
                // let finalAmount

                // if(i == 0) {
                //     finalAmount = 54.5
                // }

                // if(i == 1) {
                //     finalAmount = 34
                // }

                // if(i == 2) {
                //     finalAmount = 44.5
                // }


                return {
                    color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1`,
                    amount: randomNumber(20,50)
                }
            })

            let finalColors

            if(fullGenerator?.params?.changeColor) {
                finalColors = newColors
            } else {
                finalColors = app.playerData.params.colors
            }
    
            let newParams = {
                ...app.playerData.params,
                ...paramsObject,
                colors: finalColors
            };
            dispatch(toggleParamsValues(newParams));
            
            if(app.generatorSave) {
                dispatch(
                    shapeCreateItemWithData(
                        {
                            data: {
                                name: app.playerData.name + " (copy)",
                                algo: app.playerData.algo._id,
                                params: newParams,
                                track: app.playerData.track,
                                iteration: true,
                                // origin: app.playerData?.origin?._id ? app.playerData?.origin?._id : app.playerData._id,
                                origin: app.playerData?.genesis ? app.playerData._id : app.playerData?.origin?._id
                            },
                            callback: (data) => {
                               
                            }
                        }
                    )
                )
            }
            
            console.log(newParams);
        }
    }, [fullGenerator, app.playerData, dispatch, currentIterationRef.current, galaxys, app.generatorSave]); 



    useEffect(() => {
        searchGenerators()
        searchGalaxys()

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

    const searchGalaxys = () => {
        dispatch(
            galaxySearch({
                criteria: {},
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: 1,

                callback: (data) => {
                    setGalaxys(data.all);
                },
            })
        );
    }

    const searchGenerators = (doSelect) => {
        dispatch(
            generatorSearch({
                criteria: {},
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: -1,

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
            }, fullGenerator?.params?.iterationGap);
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
                    <div 
                        className="current-iteration"
                        onClick={() => {
                            dispatch(toggleDrawer({
                                drawerOpen: true,
                                drawerType: "iteration-settings",
                                drawerData: {
                                    iterations: fullGenerator?.params?.iterations,
                                    iteration: currentIterationRef.current,
                                }
                            }));
                        }}
                    >
                        {currentIterationRef.current}
                        {app.generatorSave && <span className="generator-save-icon"></span>}
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
