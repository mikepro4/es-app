import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function ParamRenderer({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();

    useEffect(() => {

        return () => {
            
        };
    }, []); 

    if(!item) return null;

    return (
        <div>
            Param renderer
        </div>
    );
}

export default ParamRenderer;
