import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { togglePlayer } from "@/redux";

import ShapeActionsView from "../../collection_actions/shapeActions";

function VizSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"viz-container"}>

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


                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default VizSettings;
