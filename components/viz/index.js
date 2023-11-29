import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function AppSettings(
    {
        item
    }
) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const paramsValues = useSelector((state) => state.app.paramsValues);
    const router = useRouter();
    const params = useRef()

    const [shape, setShape ] = useState(null)

    useEffect(() => {

        if(item) {
            setShape(item)
        } else {
            // setShape(app.playerData.params)
        }

    }, [item]); 

    useEffect(() => {
        params.current = shape
    }, [shape]); 

    useEffect(() => {
        params.current = app.paramsValues
        setShape(app.paramsValues)
        console.log("update here")
    }, [paramsValues]); 


    if(!shape) return null;

    return (
        <div 
            className={classNames({
                "viz-container": true,
            })}
        >

            {shape.step}

        </div>
    );
}

export default AppSettings;
