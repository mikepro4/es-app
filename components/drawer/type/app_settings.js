import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container"}>
                Settings

                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default AppSettings;
