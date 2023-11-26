import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";

import { toggleDrawer } from "@/redux";

function ShapeMainInfo({
    item,
    small
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        return () => {
            
        };
    }, []); 

    return (
        <div className="shape-main-info-container">
            <div 
                className={classNames({
                    "shape-play-button-container": true,
                    "small": small,
                })}
            >
                <Icon icon="play" />
            </div>

            <div 
                className={classNames({
                    "shape-name-container": true,
                    "small": small,
                })}

                onClick={() => {
                    dispatch(toggleDrawer({
                        drawerOpen: true,
                        drawerType: "shape-settings",
                        drawerData: item,
                    }));
                }}
            >
                <div className="shape-main-name">
                    {item.name}
                </div>
                <div className="shape-from-name-container">
                    23.3% rarity score 

                    <span className="shape-from-name-divider">|</span>
                    
                    <span className="shape-from-name">Common</span>
                </div>
            </div>



        </div>
    );
}

export default ShapeMainInfo;
