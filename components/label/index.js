import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";

function AppSettings({
    label,
    intent,
    icon,
    iconRight
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div 
            className={classNames(
                "label-container",
                {
                    "label-container--neutral": intent === "neutral",
                    "label-container--success": intent === "success",
                    "label-container--warning": intent === "warning",
                    "label-container--danger": intent === "danger",
                    "label-container--info": intent === "info",
                }
            )}
        >
            <div className="label-content">
                {icon && <div className="label-content-left">
                    <Icon icon={icon} />
                </div>}

                <div className="label-content-right">
                    {label}
                </div>

                {iconRight && <div className="label-icon-right">
                    <Icon icon={iconRight} />
                </div>}
            </div>
        </div>
    );
}

export default AppSettings;
