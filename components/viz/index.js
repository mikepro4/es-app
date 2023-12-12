import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import Ethereal from "./algos/ethereal"

function Viz({
    item,
    pause,
    respondToScroll,
    scale,
    fullScreen,
    showControls,
    preview
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    const renderAlgo = () => {
        
    }

    return (
        <>
            <Ethereal
                item={item}
                pause={pause}
                respondToScroll={respondToScroll}
                scale={scale}
                fullScreen={fullScreen}
                showControls={showControls}
                preview={preview}
            />
        </>
    );
}

export default Viz;
