import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import html2canvas from "html2canvas";

import Button from "@/components/button";

import { AppToaster } from '@/components/toaster';

import { 
    togglePlayer, 
    shapeUpdateItem, 
    toggleDrawer, 
    updateCollectionItem, 
    toggleSaveAsSvg 
} from "@/redux";

import ShapeActionsView from "../../collection_actions/shapeActions";

import ParamRenderer from "@/components/param_renderer";



function VizSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    const showToast = useCallback((message) => {
        // Ensure AppToaster is not null before calling show
        if (AppToaster) {
          AppToaster.show({ message: message});
        }
    }, []);



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    const saveAsPNG = async () => {
        // var canvas = document.getElementById("viz");
      
        const divToCapture = document.getElementById("viz-container");
        const canvas = await html2canvas(divToCapture);
        var dataURL = canvas.toDataURL("image/png");
        var newTab = window.open('about:blank', 'image from canvas');
        newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
    }

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
                                    showToast("Shape updated")
                                }
                            }))
                        }
                    }}
                />


                <ul className="shape_action_buttons">
                    <li>
                        <Button
                            label="Save as SVG"
                            minimal={true}
                            onClick={() => {
                                dispatch(toggleSaveAsSvg(true))
                            }}
                        />
                    </li>

                    <li>
                        <Button
                            label="Save as PNG"
                            minimal={true}
                            onClick={() => {
                                saveAsPNG()
                            }}
                        />
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default VizSettings;
