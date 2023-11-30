import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import Button from "@/components/button";

import { togglePlayer, shapeUpdateItem, toggleDrawer, updateCollectionItem } from "@/redux";

import ShapeActionsView from "../../collection_actions/shapeActions";

import ParamRenderer from "@/components/param_renderer";

function VizSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"viz-controls"}>

                <div className="viz-settings-header">

                    <div className="viz-settings-header-left">
                    {app.playerData?.name} 
                    </div>

                    <div className="viz-settings-header-right">
                        <ShapeActionsView
                            item={app.playerData}
                            onChange={(data) => {
                                dispatch(togglePlayer({
                                    playerOpen: true,
                                    playerData: data
                                }))


                            }}
                        />
                    </div>
                    
                </div>

                <ParamRenderer
                    item={app.playerData}
                />

                <Button
                    label="Update shape"
                    onClick={() => {
                        if(app.paramsValues) {
                            dispatch(shapeUpdateItem({
                                data: {
                                    ...app.playerData,
                                    params: app.paramsValues
                                },
                                callback: (data) => {
                                    console.log("update item", data);
                                    dispatch(toggleDrawer({
                                        drawerOpen: false,
                                        drawerType: false,
                                        drawerData: null
                                    }))
                                    dispatch(updateCollectionItem(data._id))
                                }
                            }))
                        }
                    }}
                />


                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default VizSettings;
