import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import VizTouch from "../../viz_touch";
import * as _ from 'lodash'


import { toggleSaveAsSvg } from "@/redux";

function Ethereal(
    {
        item,
        scale = 10,
        containerWidth,
        containerHeight,
        pause,
        respondToScroll = false,
        fullScreen,
        showControls,
        preview
    }
) {
    const app = useSelector((state) => state.app);
    const appData = useSelector((state) => state.appData);
    const player = useSelector((state) => state.audioPlayer);
    const mic = useSelector((state) => state.microphoneListen);
    const [loaded, setLoaded] = useState(false);
    const [mainShape, setMainShape] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const dispatch = useDispatch();
    const paramsRef = useRef()
    const canvasRef = useRef()
    const containerRef = useRef()
    const pointsRef = useRef()
    const rotate = useRef(0)
    const radius = useRef(0)
    const animationFrameId = useRef(null)
    const shape = useRef()
    const playerRef = useRef()
    const micRef = useRef()
    const [paused, setPaused] = useState(true)
    // const [shape, setShape] = useState();

    useEffect(() => {
        playerRef.current = player
        // setTimeout(() => {
        // updateColors()
        // }, 10)
    }, [player]);

    useEffect(() => {
        micRef.current = mic
        // setTimeout(() => {
        // updateColors()
        // }, 10)
    }, [mic]);

    useEffect(() => {
        if(app.saveAsSvg) {
            setupSVGCanvas()
            dispatch(toggleSaveAsSvg(false))
        }
    }, [app.saveAsSvg]);


    const setupSVGCanvas = (points) => {
        var container = document.querySelector("#centered");
        var svgkitContext = new SVGCanvas(dimensions.width, dimensions.height);
        let element = document.getElementById("svgcanvas");

        if (element) {
            element.parentNode.removeChild(element);
        }
        svgkitContext.svg.svgElement.setAttribute("class", "svg-canvas"); // just for styling
        svgkitContext.svg.svgElement.setAttribute("id", "svgcanvas");
        container.appendChild(svgkitContext.svg.svgElement);
        renderOnce(svgkitContext)
        setTimeout(() => {
            saveAsSVG()
        }, 10)
    }

    const saveAsSVG = () => {
        var svg = document.getElementById("svgcanvas");

        var rectNodes = svg.querySelectorAll('rect');
        [].slice.call(rectNodes).forEach(function (rect) {
            rect.parentNode.removeChild(rect);
        });

        //get svg source.
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        source = source.replace(/(<rect.*?<\/rect>)/g, "");


        // console.log(source)

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

        //set url value to a element's href attribute.
        var newTab = window.open('about:blank', 'image from canvas');
        newTab.document.write("<img src='" + url + "' alt='from canvas'/>");
    }

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
        let originalPointSize = Number(fullShape.pointSize)
        let mobilePointSize = originalPointSize - 0.4
        if(!preview) {
            if (containerRef.current.offsetWidth > 500) {
                if (originalPointSize > 0.6) {
                    return originalPointSize
                } else {
                    return 0.5
                }
            } else {
                if (mobilePointSize > 1.0) {
                    return mobilePointSize
                } else {
                    return 1.0
                }
            }
        } else {
            if(originalPointSize < 2.2) {
                return 2.2
            } else {
                if (containerRef.current.offsetWidth > 500) {
                    if (originalPointSize > 0.6) {
                        return originalPointSize
                    } else {
                        return 0.5
                    }
                } else {
                    if (mobilePointSize > 1.0) {
                        return mobilePointSize
                    } else {
                        return 1.0
                    }
                }
            }
        }

    }

    const getInternalScale = (fullShape) => {
        if(preview) {
            return 1.5
        } else {
            return fullShape.scale ? Number(fullShape.scale) : 1
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
            scale: fullShape.scale ? Number(fullShape.scale) : 1,
            colors: fullShape.colors,
            pointCount: Number(fullShape.pointCount),
        }
    }


    const generatePoints = () => {
        let generatedPoints = []
        const pixelRatio = window.devicePixelRatio
        for (var i = 0; i < paramsRef.current?.pointCount; i++) {
            var pt = createPoint(
                Math.random(1) * containerRef.current.offsetWidth * pixelRatio,
                Math.random(1) * containerRef.current.offsetHeight * pixelRatio,
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
            color: paramsRef.current[i]?.color,
        }

        return point
    }

    useEffect(() => {

        if (item) {
            paramsRef.current = item
            updateShape(item)
            setMainShape(true)
            updateDimensions();
            setTimeout(() => {
                updateColors()
            }, 1)
        }



    }, [item]);


    useEffect(() => {
        if (!_.isEqual(paramsRef.current?.colors, shape.current?.colors) && !paused) {
            generatePoints()
            setTimeout(() => {
                updateColors()
            }, 1)
        }
    }, [paramsRef.current?.colors, paused]);

    useEffect(() => {
        if (paramsRef.current?.pointCount !== shape.current?.pointCount && !paused) {
            generatePoints()
            setTimeout(() => {
                updateColors()
            }, 100)
        }

    }, [paramsRef.current?.pointCount, paused]);

    useEffect(() => {
        if (!loaded && dimensions.width > 0 && dimensions.height > 0 && !paused) {
            generatePoints()
            setTimeout(() => {
                updateColors()
            }, 1)
            setLoaded(true)
        }

    }, [dimensions, paused])

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
                // ctx.scale(pixelRatio, pixelRatio); // Scale the canvas context
            }
        }
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        if (animationFrameId.current == null && !pause && !respondToScroll && !paused) {
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
        // if (paramsRef.current?.overlayOpacity > 0) {
        let finalBlur = 1000
        let finalOpacity = 1

        if (containerRef.current) {
            if (containerRef.current?.offsetWidth > 500) {
                finalBlur = paramsRef.current?.overlayBlur

            } else {
                finalBlur = paramsRef.current?.overlayBlur / 1.2
            }
            finalOpacity = paramsRef.current?.overlayOpacity
        }

        return (
            <div
                className="overlay"
                style={{
                    backgroundColor: paramsRef.current?.overlayColor,
                    opacity: finalOpacity,
                    backdropFilter: `blur(${finalBlur}px)`,
                    "-webkit-backdrop-filter": `blur(${finalBlur}px)`,
                }}
            />
        )
        // }
    }

    const getScale = () => {
        let finalScale = 1

        if (fullScreen) {
            if (containerRef.current.offsetWidth > 500) {
                finalScale = scale
            } else {
                finalScale = 4
            }
        } else {
            finalScale = scale
        }

        return finalScale

    }



    const getPointIterator = (i) => {
        if (i <= 500) {
            return i
        } else {
            return i - 1024
        }
    }

    function getVolume() {
        if (playerRef?.current?.analyser) {

            const dataArray = new Uint8Array(playerRef.current.analyser.frequencyBinCount);

            playerRef.current.analyser.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }

            let average = sum / dataArray.length;
            return average; // This is the approximate volume
        } else {
            return 0
        }

    }

    const renderOnce = (ctx) => {
        let shapeViz = shape.current;


        const pixelRatio = window.devicePixelRatio || 1
        const width = containerRef.current.offsetWidth * pixelRatio;
        const height = containerRef.current.offsetHeight * pixelRatio;
        const centerX = width / 2;
        const centerY = height / 2;
        // const volume = getVolume()

        let radius = width / getScale() / shape.current.scale;


        ctx.clearRect(0, 0, width, height);

        let freqData = []
        let soundModifier = 1

        if (playerRef.current.analyser) {
            freqData = new Uint8Array(playerRef.current.analyser.frequencyBinCount)
            playerRef.current.analyser.getByteFrequencyData(freqData)
        }

        if (micRef.current.microphoneAnalyser) {
            freqData = new Uint8Array(micRef.current.microphoneAnalyser.frequencyBinCount)
            micRef.current.microphoneAnalyser.getByteFrequencyData(freqData)
        }

        let l = pointsRef.current.length;


        for (i = 0; i < l; i++) {
            let pt = pointsRef.current[i];

            // if (playerRef.current.analyser && soundModifier) {

            //     soundModifier = freqData[i] / 100

            //     if (!soundModifier) {
            //         soundModifier = 0
            //     }
            // }

            if (micRef.current.microphoneAnalyser && soundModifier) {

                soundModifier = freqData[i] / 100

                if (!soundModifier) {
                    soundModifier = 0
                }
            }


            var t_radius = Math[shapeViz.math](rotate.current + shapeViz.frequency * i) * radius * shapeViz.boldRate + radius;
            var tx = centerX + Math.cos(rotate.current + shapeViz.step * i + soundModifier) * t_radius;
            var ty = centerY + Math.sin(rotate.current + shapeViz.step * i + soundModifier) * t_radius;

            pt.vx += (tx - pt.x) * shapeViz.pointRotateSpeed;
            pt.vy += (ty - pt.y) * shapeViz.pointRotateSpeed;

            pt.x += pt.vx;
            pt.y += pt.vy;

            pt.vx *= shapeViz.friction;
            pt.vy *= shapeViz.friction;

            // if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, shapeViz.pointSize, 0, 2 * Math.PI);
            ctx.fillStyle = pt.color;
            ctx.fill();
            // }
        }

    }

    const frameTicker = useCallback(() => {
        if (canvasRef.current && paramsRef.current && shape.current && shape.current.math && pointsRef.current?.length > 0) {
            let shapeViz = shape.current;
            let ctx = canvasRef.current.getContext('2d');
            renderOnce(ctx)

            rotate.current += Number(shapeViz.rotateSpeed);
        }

        if (animationFrameId.current !== null) {
            animationFrameId.current = requestAnimationFrame(frameTicker);
        }

    }, [dimensions.width, dimensions.height, shape.current, item, playerRef.current, pointsRef.current]);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setPaused(false)
                if (animationFrameId.current == null && !pause) {
                    animationFrameId.current = requestAnimationFrame(frameTicker);
                }
            } else {
                setPaused(true)
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
        if (pause) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null
        } else {
            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
        }
    }, [pause]);

    useEffect(() => {
        // console.log(pointsRef.current)
    }, [pointsRef.current]);

    const updateColors = () => {
        if (shape.current && shape.current.pointCount && pointsRef.current && pointsRef.current.length > 0) {
            let colors = shape.current?.colors;

            if (colors && colors.length > 0) {
                let newRanges = colors.map(point => {
                    let finalCount

                    let newCount = parseInt(point.amount) * shape.current.pointCount / 100

                    if (newCount < 1) {
                        finalCount = 1
                    } else {
                        finalCount = newCount
                    }
                    return {
                        count: finalCount
                    }
                });

                console.log("newRanges", newRanges)

                let updatedPoints = [];

                if (newRanges.length === 1) {
                    updatedPoints = pointsRef.current.slice(0, shape.current.pointCount).map(point => ({
                        ...point,
                        color: colors[0].color
                    }));
                } else {
                    let accumulatedCount = 0;
                    newRanges.forEach((range, index) => {
                        const rangePoints = pointsRef.current.slice(accumulatedCount, accumulatedCount + range.count).map(point => ({
                            ...point,
                            color: colors[index].color
                        }));
                        accumulatedCount += range.count;
                        updatedPoints = [...updatedPoints, ...rangePoints];
                    });

                    if (accumulatedCount < shape.current.pointCount) {
                        const remainingPoints = pointsRef.current.slice(accumulatedCount).map(point => ({ ...point, hidden: true }));
                        updatedPoints = [...updatedPoints, ...remainingPoints];
                    }
                }

                pointsRef.current = updatedPoints;

                // console.log("updatedPoints", updatedPoints)
            } else {
                pointsRef.current = pointsRef.current.map(point => ({
                    ...point,
                    color: `rgba(255,255,255,1)`,
                }));
            }
        }
    };


    return (
        <div
            ref={containerRef}
            className={classNames({
                "viz-container": true,
            })}
            id="viz-container"
            style={{
                backgroundColor: paramsRef.current?.backgroundColor,
            }}
        >


            {showControls && <VizTouch
                fullScreen={fullScreen}
                item={item}
                algo={app.playerData?.paramData ? app.aplerData.paramData : appData.algos.find((item) => item._id === app.playerData?.algo)}
            />}

            <canvas
                ref={canvasRef}
                className="viz"
                id="viz"
            />

            {renderOverlay()}

            <div id="centered" style={{ display: "none" }}></div>

            {/* <div
                className="placeholder-shape"
            >
                {paramsRef.current?.frequency}
            </div> */}

        </div>
    );
}

export default Ethereal;
