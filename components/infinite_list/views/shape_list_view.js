import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import ShapeActionsView from "@/components/collection_actions/shapeActions";
import ShapeMainInfo from "@/components/shape_main_info";

import Icon from "@/components/icon";
import Viz from "@/components/viz";

function ShapeListView({
    item,
    scroll
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="shape-view-list-container">

            <div className="shape-view-list-shape-container"
                onClick={() => {
                    dispatch(toggleNoRedirect(true))
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item
                    }))
                }}
            >
                <Viz 
                    item={item.params}
                    respondToScroll={true}
                    scroll={scroll}
                    pause={app.playerOpen}
                />
            </div>
        

            <div className="shape-view-actions">
                <ShapeActionsView 
                    item={item}
                />
            </div>

            <div className="shape-view-info">
                <ShapeMainInfo 
                    item={item}
                    small={true}
                />
            </div>

            <div className="shape-view-arrow" onClick={() => {
                    dispatch(toggleNoRedirect(true))
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item
                    }))
                }}>
                <Icon name="arrow-forward"/>
            </div>
            



        </div>
    );
}

export default ShapeListView;
