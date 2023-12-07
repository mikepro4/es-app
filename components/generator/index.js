import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button"
import ParamSwitch from "@/components/paramSwitch";

import { toggleDrawer } from "@/redux";

function AppSettings(props) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const [generator, setGenerator] = useState("1");
    const dispatch = useDispatch();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="generator-container">
            <ul className="generator-content">
                <li>
                    <ParamSwitch
                        display="label"
                        intent={"neutral"}
                        value={generator}
                        valueFromLabel={true}
                        offset={[-10, 0]}
                        position="bottom left"
                        params={[
                            {
                                type: "links",
                                values: [
                                    {
                                        label: "X1",
                                        value: "1",
                                    },
                                    {
                                        label: "X2",
                                        value: "2",
                                    },
                                    {
                                        label: "X3",
                                        value: "3",
                                    },
                                    {
                                        label: "X4",
                                        value: "4",
                                    },
                                ],
                            }
                        ]}
                        onChange={(value) => {
                            // alert(value)
                            setGenerator(value)
                        }}
                    />
                </li>
                <li>
                    <Button 
                        icon="play"
                        minimal={true}
                        small={true}
                        offset={1}
                    />
                </li>

                <li>
                    <Button 
                        icon="stop"
                        minimal={true}
                        small={true}
                        offset={0.5}
                    />
                </li>
                
                <li>
                    <Button 
                        icon="chevron-left"
                        minimal={true}
                        small={true}
                    />
                </li>

                <li>
                    <div className="current-iteration">
                        1
                    </div>
                </li>

                
                <li>
                    <Button 
                        icon="chevron-right"
                        minimal={true}
                        small={true}
                        offset={1}
                    />
                </li>

                <li>
                    <Button 
                        icon="edit"
                        minimal={true}
                        small={true}
                        onClick={() => {
                            dispatch(toggleDrawer({
                                drawerOpen: "true",
                                drawerType: "generator-settings",
                                drawerData: props.item,
                            }));
                        }}
                    />
                </li>
                

                
            </ul>
        </div>
    );
}

export default AppSettings;
