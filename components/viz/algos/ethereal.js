import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function Ethereal(
    {
        item,
        scale = 3,
        containerWidth,
        containerHeight
    }
) {
    const [loaded, setLoaded] = useState(false);
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
            pointSize: Number(fullShape.pointSize) - 0.5,
            pointOpacity: Number(fullShape.pointOpacity),
            pointColor: fullShape.pointColor ? fullShape.pointColor : "#ffffff",
            backgroundColor: fullShape.backgroundColor,
            backgroundEnabled: false,
            backgroundOpacity: 1
        }
    }





    const generatePoints = () => {
        let generatedPoints = []
        for (var i = 0; i < 2048; i++) {
            var pt = createPoint(
                Math.random(1) * dimensions.width,
                Math.random(1) * dimensions.height,
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
            // if (!shape) setShape(item)
        }

    }, [item]);

    useEffect(() => {
        if (!loaded && dimensions.width > 0 && dimensions.height > 0) {
            generatePoints()
            setLoaded(true)
        }


    }, [dimensions])

    const updateDimensions = () => {
        if (containerRef.current) {
            const pixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
            const width = containerRef.current.offsetWidth * pixelRatio;
            const height = containerRef.current.offsetHeight * pixelRatio;

            setDimensions({
                width,
                height,
            });

            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                const ctx = canvasRef.current.getContext('2d');
                ctx.scale(pixelRatio, pixelRatio); // Scale the canvas context
            }
        }
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        animationFrameId.current = requestAnimationFrame(frameTicker);


        return () => {
            window.removeEventListener("resize", updateDimensions);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);


    const renderOverlay = () => {

    }

    const getWidth = () => {
      
        return dimensions.width
    }

    const getHeight = () => {
        return dimensions.height
    }

    // const frameTicker = useCallback(() => {
    //     if (canvasRef.current && pointsRef.current?.length > 0) {

    //         const width = containerRef.current.offsetWidth*4;
    //         const height = containerRef.current.offsetHeight*4

    //         radius.current = width / scale;

            
    //         let shapeViz = shape.current
    //         let ctx = canvasRef.current.getContext('2d');
    //         const centerX = width / 2;
    //         const centerY = height / 2;

    //         ctx.clearRect(0, 0, height * 3, width * 3);

    //         let l = pointsRef.current.length;

    //                 // Draw a simple circle
    //         ctx.beginPath();
    //         ctx.arc(centerX, centerY, 50, 0, Math.PI * 2); // 50 is the radius of the circle
    //         ctx.fillStyle = 'red'; // Fill color of the circle
    //         ctx.fill();


    //         for (i = 0; i < l; i++) {
    //             let pt = pointsRef.current[i];

    //             let w = width;
    //             let h = height;

    //             var t_radius = Math[shapeViz.math](rotate.current + shapeViz.freq * i) * radius.current * shapeViz.boldRate + radius.current;
    //             var tx = centerX + Math.cos(rotate.current + shapeViz.step * i) * t_radius;
    //             var ty = centerY + Math.sin(rotate.current + shapeViz.step * i) * t_radius;

    //             pt.vx += (tx - pt.x) * shapeViz.pointRotateSpeed;
    //             pt.vy += (ty - pt.y) * shapeViz.pointRotateSpeed;

    //             pt.x += pt.vx;
    //             pt.y += pt.vy;

    //             pt.vx *= shapeViz.friction;
    //             pt.vy *= shapeViz.friction;

    //             if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
    //                 ctx.fillStyle = "rgb(255, 255, 255, 1.0)";
    //                 ctx.fillRect(pt.x, pt.y, 0.7, 1);
    //             }
    //         }

    //         rotate.current += shapeViz.rotateSpeed;
    //     }

    //     // frameTicker()

    //     if (animationFrameId.current !== null) {
    //         animationFrameId.current = requestAnimationFrame(frameTicker);
    //     }

    // }, []);

    const frameTicker = useCallback(() => {
        const pixelRatio = window.devicePixelRatio || 1; 
        if (canvasRef.current && pointsRef.current?.length > 0) {
            let shapeViz = shape.current;
            let ctx = canvasRef.current.getContext('2d');
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            const centerX = width / 2;
            const centerY = height / 2;

            let radius = width / 6;


            ctx.clearRect(0, 0, width, height);

            // // Draw a simple circle
            // ctx.beginPath();
            // ctx.arc(centerX, centerY, 50, 0, Math.PI * 2); // 50 is the radius of the circle
            // ctx.fillStyle = 'red'; // Fill color of the circle
            // ctx.fill();

            // ctx.clearRect(0, 0, dimensions.width * 3, dimensions.height * 3);

            let l = pointsRef.current.length;


            for (i = 0; i < l; i++) {
                let pt = pointsRef.current[i];


                var t_radius = Math[shapeViz.math](rotate.current + shapeViz.frequency * i) * radius * Number(shapeViz.boldRate) + radius;
                // console.log("t_radius", t_radius)
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

                if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
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
                }
            }

            rotate.current += Number(shapeViz.rotateSpeed);
        }

        // frameTicker()

        if (animationFrameId.current !== null) {
            animationFrameId.current = requestAnimationFrame(frameTicker);
        }

    }, [dimensions.width, dimensions.height]);



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
