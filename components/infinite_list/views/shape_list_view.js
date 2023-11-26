import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import ShapeActionsView from "@/components/collection_actions/shapeActions";
import ShapeMainInfo from "@/components/shape_main_info";

function ShapeListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="shape-view-list-container">

            <div className="shape-view-list-shape-container"
                onClick={() => {
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item
                    }))
                }}
            >
                <div className="shape-placeholder"></div>
            </div>
        

            <div className="shape-view-actions">
                <ShapeActionsView 
                    item={item}
                />
            </div>

            <div className="shape-view-info">
                <ShapeMainInfo 
                    item={item}
                />
            </div>
            



        </div>
    );
}

export default ShapeListView;
