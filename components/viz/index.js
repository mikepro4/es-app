import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function AppSettings(
    {
        item
    }
) {
    const [loading, setLoading] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const paramsRef = useRef()
    const canvasRef = useRef()
    const containerRef = useRef()
    const [shape, setShape] = useState();

    const exampleParams = {
        "math": "sin",
        "frequency": "0.6764000000000139",
        "step": "9.424240000000319",
        "rotateSpeed": "0.005000000000000013",
        "boldRate": "0.12",
        "friction": "0.01",
        "pointRotateSpeed": "0.01",
        "pointSize": "1.3",
        "pointCount": "2048",
        "pointOpacity": "1",
        "backgroundColor": "rgba(255,153,153, 1)",
        "overlayBlur": "0",
        "overlayOpacity": "0",
        "overlayColor": "rgba(0,0,0, 1)"
    }

    useEffect(() => {

        if (item) {
            paramsRef.current = item
        
            if(!shape) setShape(item)
        } 

    }, [item]);

    const updateDimensions = () => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);


    const renderOverlay = () => {

    }


    if (!item) return null;

    return (
        <div
            ref={containerRef}
            className={classNames({
                "viz-container": true,
            })}
            style={{
                backgroundColor: paramsRef.current?.backgroundColor,
            }}
        >
            <canvas
                ref={canvasRef}
                className="viz"
                id="viz"
                width={dimensions.width}
                height={dimensions.height}
            />

            <div 
                className="placeholder-shape"
            >
                {paramsRef.current?.frequency}
            </div>

        </div>
    );
}

export default AppSettings;
