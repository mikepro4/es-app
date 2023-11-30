import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import Ethereal from "./algos/ethereal"

function AppSettings({
    item
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
            />
        </>
    );
}

export default AppSettings;
