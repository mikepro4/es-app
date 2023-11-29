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
    const [shape, setShape] = useState(null)

    useEffect(() => {

        if (item) {
            setShape(item)
            paramsRef.current = item
        } else {
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
        // paramsRef.current = shape

        window.addEventListener("resize", updateDimensions);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };

    }, [shape]);

    // useEffect(() => {
    //     paramsRef.current = app.paramsValues
    //     setShape(app.paramsValues)
    // }, [paramsValues]);


    const renderOverlay = () => {

    }


    if (!shape) return null;

    return (
        <div
            ref={containerRef}
            className={classNames({
                "viz-container": true,
            })}
            style={{
                backgroundColor: paramsRef.current.backgroundColor,
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
                {paramsRef.current.frequency}
            </div>

        </div>
    );
}

export default AppSettings;
