import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
        <div className="touch-viz-container">
                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>

                <div className="touch-viz-button">
                </div>
        </div>
    );
}

export default AppSettings;
