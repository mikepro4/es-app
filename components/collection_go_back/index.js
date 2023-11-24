import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Icon from "../icon";

import { toggleDrawer } from "@/redux";

function CollectionGoBack({
    icon,
    label,
    iconRight,
    onClick
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <div className="collection-goback-container">
            <div 
                className="collection-info-bar"
                onClick={() => onClick && onClick()}
            >
                {icon && <div className="collection-properties-button search-button">
                    <Icon name={icon}/>
                </div>}

                {label && <div className="collection-info-bar-left">
                    <span className="collection-goback-label">{label}</span>
                </div>}

                {iconRight && <div className="collection-properties-button right-icon">
                    <Icon name={iconRight}/>
                </div>}
                
            </div>
        </div>
    );
}

export default CollectionGoBack;
