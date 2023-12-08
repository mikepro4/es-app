import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button"
import ParamSwitch from "@/components/paramSwitch";

import { toggleDrawer, generatorSearch, updateCollection } from "@/redux";
import { set } from "lodash";

function AppSettings(props) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const [generator, setGenerator] = useState();
    const dispatch = useDispatch();
    const [generators, setGenerators] = useState([]);
    const [currentIteration, setCurrentIteration] = useState(1);
    const [status, setStatus] = useState("stopped");
    const [timeInterval, setTimeInterval] = useState(null);



    useEffect(() => {
        searchGenerators()

        // dispatch(toggleDrawer({
        //     drawerOpen: true,
        //     drawerType: "generator-settings",
        //     drawerData: props.item,
        // }));

        return () => {
            
        };
    }, []); 

    useEffect(() => {
        if(app.updateCollection ) {
            searchGenerators()

            // dispatch(toggleDrawer({
            //     drawerOpen: true,
            //     drawerType: "generator-settings",
            //     drawerData: props.item,
            // }));

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
                    let finalOptinos = data.all.map((option) => {
                        return {
                            value: option._id,
                            label: option.name,
                        };
                    });
                    setGenerators(finalOptinos);
                    setGenerator(finalOptinos[0]?.value)
                    // setTimestamp(Date.now())
                    // if(finalOptinos[0]?.value && doSelect) {
                    //     setTimeout(() => {
                    //         selectGenerator(finalOptinos[0].value)
                    //     }, 100)
                    // }
                   
                },
            })
        );
    }

    const togglePlay = () => {
        if (status !== "play") {
            setStatus("play");
            const intervalId = setInterval(() => {
                setCurrentIteration(prevCurrentIteration => prevCurrentIteration + 1);
            }, 1);
            setTimeInterval(intervalId);
        } else {
            setStatus("stopped");
            clearInterval(timeInterval);
            setTimeInterval(null);
        }
    };

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
                        onClick={() => {
                            setStatus("stopped");
                            setCurrentIteration(1);
                            clearInterval(timeInterval);
                            setTimeInterval(null);
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
                            if(currentIteration > 1) {
                                prevIteration = currentIteration - 1
                            } else{
                                prevIteration = 1
                            }
                            setCurrentIteration(prevIteration);
                        }}
                    />
                </li>

                <li>
                    <div className="current-iteration">
                        {currentIteration}
                    </div>
                </li>

                
                <li>
                    <Button 
                        icon="chevron-right"
                        minimal={true}
                        small={true}
                        offset={1}
                        onClick={() => {
                            setCurrentIteration(currentIteration + 1);
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
