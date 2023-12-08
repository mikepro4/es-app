import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import ParamSwitch from "@/components/paramSwitch";
import { shapeCreate, updateCollection } from "@/redux"

import ShapeChangeSort from "@/components/collection_actions/shapeChangeSort"

import { OverlayToaster } from '@blueprintjs/core';

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const shapeList = useSelector((state) => state.shapeList);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef(null)


    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="collection-details">
            <div className="collection-details-left">
                <span className="collection-count-number">{shapeList.count}</span>
                <span className="collection-count-total">of {shapeList.total} items</span>
                
            </div>

            <div className="change-sort-container">
                    <ShapeChangeSort />
                </div>

        </div>
    );
}

export default AppSettings;
