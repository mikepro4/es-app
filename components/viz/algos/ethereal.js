import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import VizTouch from "../../viz_touch";

function Ethereal(
    {
        item,
        scale = 8,
        containerWidth,
        containerHeight,
        pause,
        respondToScroll = false, 
        fullScreen,
        showControls
    }
) {
    const [loaded, setLoaded] = useState(false);
    const [mainShape, setMainShape] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const paramsRef = useRef()
    const canvasRef = useRef()
    const containerRef = useRef()
    const pointsRef = useRef()
    const rotate = useRef(0)
    const radius = useRef(0)
    const animationFrameId = useRef(null)
    const shape = useRef()
    // const [shape, setShape] = useState();

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

    const getPointSize = (fullShape) => {
        let finalSize
        let originalPointSize = Number(fullShape.pointSize) - 0.7
        let mobilePointSize = originalPointSize - 0.9

        if(containerRef.current.offsetWidth > 500) {
            if(originalPointSize > 0.6) {
                return originalPointSize
            } else {
                return 0.5
            }
        } else {
            if(mobilePointSize > 1.0) {
                return mobilePointSize
            } else {
                return 0.4
            }
        }
    }

    const updateShape = (fullShape) => {
        console.log("fullShape", fullShape)
        shape.current = {
            rotateSpeed: Number(fullShape.rotateSpeed) * 0.1 + 0.001,
            friction: Number(fullShape.friction) * 0.8 + 0.1,
            pointRotateSpeed: Number(fullShape.pointRotateSpeed) * 0.2 + 0.03,
            step: Number(fullShape.step) * 0.5 + 0.0001,
            frequency: Number(fullShape.frequency) * 0.09 + 0.01,
            boldRate: Number(fullShape.boldRate) * 0.3 + 0.1,
            math: fullShape.math,
            pointSize: getPointSize(fullShape),
            pointOpacity: Number(fullShape.pointOpacity),
            pointColor: fullShape.pointColor ? fullShape.pointColor : "#ffffff",
            backgroundColor: fullShape.backgroundColor,
            backgroundEnabled: false,
            backgroundOpacity: 1,
            scale: fullShape.scale ?  Number(fullShape.scale) : 1,
        }
    }


    const generatePoints = () => {
        let generatedPoints = []
        for (var i = 0; i < paramsRef.current?.pointCount; i++) {
            var pt = createPoint(
                Math.random(1) * containerRef.current.offsetWidth,
                Math.random(1) * containerRef.current.offsetHeight,
            );
            generatedPoints.push(pt)
        }
        pointsRef.current = generatedPoints
    }

    const createPoint = (x, y, i) => {

        let point = {
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            color: "#ffffff",
        }

        return point
    }

    useEffect(() => {

        if (item) {
            paramsRef.current = item
            updateShape(item)
            setMainShape(true)
            updateDimensions();
        }

    }, [item]);

    useEffect(() => {
        if (paramsRef.current?.pointCount !== shape.current.pointCount) {
            generatePoints()
        }

    }, [paramsRef.current?.pointCount]);  

    useEffect(() => {
        if (!loaded && dimensions.width > 0 && dimensions.height > 0) {
            generatePoints()
            setLoaded(true)
        }

    }, [dimensions])

    const updateDimensions = () => {
        if (containerRef.current) {
            const pixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
            const width = containerRef.current.offsetWidth * 4;
            const height = containerRef.current.offsetHeight * 4;

            setDimensions({
                width,
                height,
            });

            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                const ctx = canvasRef.current.getContext('2d');
                ctx.scale(4, 4); // Scale the canvas context
            }
        }
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        if(animationFrameId.current == null && !pause && !respondToScroll) {
            animationFrameId.current = requestAnimationFrame(frameTicker);
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = true;

        return () => {
            window.removeEventListener("resize", updateDimensions);
            cancelAnimationFrame(animationFrameId.current);
            console.log("stop animation from player")
        };
    }, []);


    const renderOverlay = () => {

    }

    const getScale = () => {
        let finalScale = 1

        if(fullScreen) {
            if(containerRef.current.offsetWidth > 500) {
                finalScale = scale
            } else {
                finalScale = 4
            }
        } else {
            finalScale = scale
        }

        return finalScale

    }

    const frameTicker = useCallback(() => {
        if (canvasRef.current && paramsRef.current && shape.current && shape.current.math && pointsRef.current?.length > 0) {
            let shapeViz = shape.current;
            let ctx = canvasRef.current.getContext('2d');
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            const centerX = width / 2;
            const centerY = height / 2;

            let radius = width / getScale() / shape.current.scale;


            ctx.clearRect(0, 0, width, height);

        
            let l = pointsRef.current.length;


            for (i = 0; i < l; i++) {
                let pt = pointsRef.current[i];


                var t_radius = Math[shapeViz.math](rotate.current + shapeViz.frequency * i) * radius * shapeViz.boldRate + radius;
                let w = containerRef.current.offsetWidth;
                let h = containerRef.current.offsetHeight;
                var tx = centerX + Math.cos(rotate.current + shapeViz.step * i) * t_radius;
                var ty = centerY + Math.sin(rotate.current + shapeViz.step * i) * t_radius;

                pt.vx += (tx - pt.x) * shapeViz.pointRotateSpeed;
                pt.vy += (ty - pt.y) * shapeViz.pointRotateSpeed;

                pt.x += pt.vx;
                pt.y += pt.vy;

                pt.vx *= shapeViz.friction;
                pt.vy *= shapeViz.friction;

                // if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, shapeViz.pointSize, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
                    // ctx.fillStyle = `rgba(
                    //     ${this.hexToRgb(point.color).r},
                    //     ${this.hexToRgb(point.color).g},
                    //     ${this.hexToRgb(point.color).b},
                    //     ${this.getPointOpacity(freqData[this.getPointIterator(i)], point)}
                    // )`;
                    ctx.fill();
                // }
            }

            rotate.current += Number(shapeViz.rotateSpeed);
        }

        if (animationFrameId.current !== null) {
            animationFrameId.current = requestAnimationFrame(frameTicker);
        }

    }, [dimensions.width, dimensions.height, shape.current, item]);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                if(animationFrameId.current == null && !pause) {
                    animationFrameId.current = requestAnimationFrame(frameTicker);
                }
            } else {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null
            }
        },
        {
            root: null, // null means it observes changes in the viewport
            threshold: 0.5 // 0.5 means 50% visibility
        }
    );

    useEffect(() => {
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);

    useEffect(() => {
        if(pause) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null
        } else {
            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
        }
    }, [pause]);

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


            {showControls && <VizTouch 
                fullScreen={fullScreen} 
                item={item}
            />}

            <canvas
                ref={canvasRef}
                className="viz"
                id="viz"
            />

            {/* <div
                className="placeholder-shape"
            >
                {paramsRef.current?.frequency}
            </div> */}

        </div>
    );
}

export default Ethereal;
