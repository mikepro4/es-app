import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import axios from "axios";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";

import { OverlayToaster } from '@blueprintjs/core';

import {hexToRgba} from "@/utils/hexToRgba"

import Viz from "@/components/viz";

import { shapeCreate } from "@/redux";

function AddShape() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const [params, setParams] = useState(null);
    const toasterRef = useRef()
    const dispatch = useDispatch();

    // const shapeExample = {
    //     rotateSpeed: Number(fullShape.rotateSpeed) * 0.1 + 0.001,
    //     friction: Number(fullShape.friction) * 0.8 + 0.1,
    //     pointRotateSpeed: Number(fullShape.pointRotateSpeed) * 0.2 + 0.03,
    //     step: Number(fullShape.step) * 0.5 + 0.0001,
    //     frequency: Number(fullShape.frequency) * 0.09 + 0.01,
    //     boldRate: Number(fullShape.boldRate) * 0.3 + 0.1,
    //     math: fullShape.math,
    //     pointSize: getPointSize(fullShape),
    //     pointOpacity: Number(fullShape.pointOpacity),
    //     pointColor: fullShape.pointColor ? fullShape.pointColor : "#ffffff",
    //     backgroundColor: fullShape.backgroundColor,
    //     backgroundEnabled: false,
    //     backgroundOpacity: 1,
    //     scale: fullShape.scale ?  Number(fullShape.scale) : 1,
    //     colors: fullShape.colors,
    //     pointCount: Number(fullShape.pointCount),
    // }

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };

    const addShape = (params) => {
        dispatch(shapeCreate({
            name: "From ES",
            params: params,
            algo: "6563fe999e29ba405e2f658c",
            callback: ((data) => {
                console.log("callback")
                toasterRef.current.show({ message: `Shape was created` });
            })
        }))
    }

    const remapOriginalValues = (values) => {
        let newColors = []
        if(values.defaultViz.colors && values.defaultViz.colors.length > 0)  { 
            newColors = values.defaultViz.colors.map((color) => {
                return {
                    color: hexToRgba(color.hex, color.opacity/ 100) ,
                    amount: Number(color.amount)
                }
            })
        } 
       

        

        let finalShapeParams = {
            rotateSpeed: values.defaultViz.shape.rotateSpeed,
            friction: values.defaultViz.shape.friction,
            pointRotateSpeed: values.defaultViz.shape.rotatePointSpeed,
            step: values.defaultViz.shape.step,
            frequency: values.defaultViz.shape.frequency,
            boldRate: values.defaultViz.shape.boldRate,
            math: values.defaultViz.shape.math,
            pointSize: values.defaultViz.point.pointSize,
            pointOpacity: values.defaultViz.point.pointOpacity,
            backgroundColor: values.defaultViz.shape.backgroundColor ? hexToRgba(values.defaultViz.shape.backgroundColor, 1) : "rgba(0,0,0,1)",
            scale: 1,
            colors: newColors,
            pointCount: values.defaultViz.point.pointCount,
            overlayBlur: values.defaultViz.overlay?.visible ? values.defaultViz.overlay.blur : 0,
            overlayOpacity: values.defaultViz.overlay?.visible ? 1 : 0,
            overlayColor: values.defaultViz.overlay?.color ? hexToRgba(values.defaultViz.overlay.color, values.defaultViz.overlay.colorOpacity) : "rgba(0,0,0,1)",
            
        }
        console.log(finalShapeParams);
        setParams(finalShapeParams)
        // dispatch(shapeCreate({
        //     name: "From ES",
        //     params: finalShapeParams,
        //     algo: "6563fe999e29ba405e2f658c",
        //     callback: ((data) => {
        //         console.log("callback")
        //         toasterRef.current.show({ message: `Shape was created` });
        //     })
        // }))
    }

    const handleSubmit = (values) => {
        fetchEtherealShape(values.shapeId)
    };




    useEffect(() => {

        return () => {
            
        };
    }, []); 

    const fetchEtherealShape = async (shapeId) => {
          const response = await axios.post("https://mikhailcoapi.herokuapp.com/shapes/item", {
              shapeId
            });
            console.log(response.data)
            remapOriginalValues(response.data)
            

          return response.data;
        }

    return (
        <div className="add-shape-container">
            <Formik
                initialValues={{
                    shapeId: "620f5da262ae4100210b3ce2",
                }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit }) => {

                    useEffect(() => {
                        handleFormChange(values);
                    }, [values]);

                    return (
                        <Form
                        >
                            <div className="form-fields">


                                <Field
                                    name="shapeId"
                                    component={Input}
                                    title="Shape Id"
                                    placeholder="Shape Id"
                                />

                            </div>

                            <Button
                                type="submit"
                                label="Fetch"
                            />

                            {/* <div className="form-divider"></div>

                            <Button
                                type="button"
                                minimal={true}
                                label="Update all"
                                onClick={() => {
                                    dispatch(toggleModal({
                                        modalOpen: true,
                                        modalType: "update-all",
                                        modalData: values,
                                    }))
                                }}
                            /> */}

                        </Form>
                    )
                }}
            </Formik>

            <OverlayToaster ref={toasterRef} />

            <div className="viz-preview-container">

                {params && <Viz
                    item={params}
                    scale={6}
                />}
            </div>

            {params && <Button
                onClick={() => {
                    addShape(params)
                }}
                label="Add shape"
            /> }

            

        </div>
    );
}

export default AddShape;
