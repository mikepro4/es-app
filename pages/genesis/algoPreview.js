import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamRenderer from "@/components/param_renderer";

function AlgoPreview({
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
        <div className="algo-preview-container">

            <div className="algo-preview-animation">
                <div className="shape-placeholder"></div>
            </div>

            <div className="algo-preview-params">
                <ParamRenderer
                    item={item}
                />
            </div>
           
        </div>
    );
}

export default AlgoPreview;
