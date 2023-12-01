import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamRenderer from "@/components/param_renderer";
import Viz from "@/components/viz";
import Button from "@/components/button";

import { OverlayToaster } from '@blueprintjs/core';

import { shapeCreate, toggleParamsValues } from "@/redux";

function AlgoPreview({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef()

    useEffect(() => {

        return () => {
            dispatch(toggleParamsValues(null))
        };
    }, []); 

    if(!item) return null;

    const parseValues = (values) => {
        // let newValues = values.map((value, i) => {
        //     if (value.type === 'array') {
        //         return {
        //             [value.labe]: value.values,
        //         }
        //     } else {
        //         return {
        //             [value.label]: value.defaultValue
        //         }
        //     }
        // })

        const paramsToPush = values.params.reduce((obj, item) => {
            if (item.type === 'array') {
                obj[item.value] = item.values;
            } else {
                obj[item.value] = item.defaultValue;
            }
            return obj;
        }, {});

        return paramsToPush
    }


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
                                name: "From Algo",
                                params: app.paramsValues,
                                algo: item._id,
                                callback: ((data) => {
                                    console.log("callback")
                                    toasterRef.current.show({ message: `Shape was created` });
                                })
                            }))
                        }}
                    />
                </div>
                <Viz
                    item={app.paramsValues ? app.paramsValues : parseValues(app.paramsData)}
                    scale={4.5}
                />
            </div>

            <div className="algo-preview-params">
                <ParamRenderer
                    item={item}
                />
            </div>

            <OverlayToaster ref={toasterRef} />
           
        </div>
    );
}

export default AlgoPreview;
