import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamRenderer from "@/components/param_renderer";
import Viz from "@/components/viz";
import Button from "@/components/button";

import { shapeCreate } from "@/redux";

function AlgoPreview({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            
        };
    }, []); 

    if(!item) return null;

    return (
        <div className="algo-preview-container">

            <div className="algo-preview-animation">
                <div className="shape-create-button">
                    <Button
                        icon="plus"
                        minimal={true}
                        small={true}
                        onClick={() => {
                            dispatch(shapeCreate({
                                name: item.name,
                                params: app.paramsValues,
                                callback: ((data) => {
                                    console.log("callback")
                                })
                            }))
                        }}
                    />
                </div>
                <Viz
                    item={app.paramsValues}
                />
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
