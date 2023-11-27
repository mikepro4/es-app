import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import { v4 as uuidv4 } from 'uuid';

import AlgoActionsView from "@/components/collection_actions/algoActions";

import { algoUpdateItem, updateCollectionItem, algoItem, algoUpdateManyItems } from "@/redux";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import {
    Switch,
    OverlayToaster,
} from "@blueprintjs/core";

function AlgoPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef(null)


    const [algo, setAlgo] = useState(false);

    const fetchAlgo = () => {
        dispatch(algoItem({
            id: router.query.algoId,
            callback: (data) => {
                console.log(data);
                setAlgo(data)
                dispatch(updateCollectionItem(null))
            }
        }))
    }

    



    useEffect(() => {
        fetchAlgo()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem  && app.updateCollectionItem == algo?._id) {
            fetchAlgo()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.algoId && algo?.id && router.query.algoId !== algo?.id) {
            fetchAlgo()
        }
    }, [router]);

    const renderAlgo = () => {
        if (algo && algo._id) {
            return (
                <div className="algo-page-header">
                    <div className="algo-page-header-left">
                        <h1>{algo.name}</h1>
                    </div>

                    <div className="algo-page-header-right">
                        <AlgoActionsView
                            item={algo}
                        />
                    </div>

                </div>
            )
        }
    }

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))

    };

    const handleSubmit = (values) => {

        dispatch(algoUpdateItem({
            data: {
                ...algo,
                ...values
            },
            callback: (data) => {
                dispatch(updateCollectionItem(data._id))
                toasterRef.current.show({ message: "Algo updated" });

                dispatch(toggleDrawer({
                    drawerOpen: false,
                    drawerType: null,
                    drawerData: null,
                }))
            }
        }))
    };

    let initialValues = {
        slug: algo?.slug,
        params: algo?.params || [],
    }

    const handleDefaultChange = (event) => {
        let value = event.target.checked

        dispatch(algoUpdateManyItems({
            newCriteria: {
                default: false
            },
            callback: (data) => {

                dispatch(algoUpdateItem({
                    data: {
                        ...algo,
                        default: value
                    },
                    callback: (data) => {
                        toasterRef.current.show({ message: "Algo updated" });
                        dispatch(updateCollectionItem(algo._id))
                    }
                })

                )


            }
        }))
    }

    const addParameterToParam = (setFieldValue, values) => {
        // Create a new parameter object
        const newParameter = {
            value: `param-${values.params.length + 1}`,
            label: `Parameter ${values.params.length + 1}`,
            id: uuidv4()
        };

        // Copy the current params and add the new parameter to the specified param
        const newParams = [...values.params];
        newParams.push(newParameter);

        // Update Formik values
        setFieldValue('params', newParams);
    };

    const removeParameterFromParam = (index, setFieldValue, values) => {
        // Create a new array excluding the param at the given index
        const newParams = values.params.filter((_, paramIndex) => paramIndex !== index);

        // Update Formik values
        setFieldValue('params', newParams);
    };

    return (
        <div className="algo-page-container">



            <div className="algo-page-content">

                <Button
                    label="Back"
                    icon="arrow-left"
                    minimal={true}
                    small={true}
                    wrap={true}
                    onClick={() => {
                        router.push({
                            pathname: '/genesis',
                            query: { ...router.query, algoId: null },
                        }, undefined, { shallow: true })
                    }}
                />

                {renderAlgo()}


                <div className="algo-page-content-container">
                    <div className="algo-page-content-left">


                        <div className="algo-preview"></div>

                        <div className="switch-container">
                            <Switch
                                checked={algo?.default}
                                onChange={handleDefaultChange}
                            />
                            <span>Default algo</span>
                        </div>



                    </div>


                    <div className="algo-page-content-right">
                        <div className="algo-properties-container">
                            <div className="algo-properties-container-header">
                                <div className="algo-properties-container-left">
                                    Properties
                                </div>
                                <div className="algo-properties-container-right">

                                </div>
                            </div>
                            <div className="algo-form">
                                {algo && algo._id && <Formik
                                    enableReinitialize={true}
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, handleChange, handleSubmit, setFieldValue }) => {

                                        useEffect(() => {
                                            handleFormChange(values);
                                        }, [values]);

                                        return (
                                            <Form
                                            >
                                                <div className="form-fields">

                                                    <Field
                                                        name="slug"
                                                        component={Input}
                                                        title="Slug"
                                                        placeholder="Slug"
                                                    />

                                                    <DragDropContext
                                                        onDragEnd={result => {
                                                            const { source, destination } = result;

                                                            // Check if param is dropped outside the list
                                                            if (!destination) {
                                                                return;
                                                            }

                                                            const newParams = Array.from(values.params);
                                                            const [removed] = newParams.splice(source.index, 1);
                                                            newParams.splice(destination.index, 0, removed);

                                                            setFieldValue('params', newParams);
                                                        }}
                                                    >
                                                        <Droppable droppableId="droppable">
                                                            {(provided) => (
                                                                <div 
                                                                    {...provided.droppableProps} 
                                                                    ref={provided.innerRef}
                                                                    className="params-container"
                                                                >
                                                                    <div className="params-container-header">
                                                                        Params
                                                                    </div>

                                                                    {values.params.map((param, index) => (
                                                                        <Draggable key={param.id} draggableId={param.id} index={index}>
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className="form-fields-draggable"
                                                                                >

                                                                                    <div className="draggable-field-header">
                                                                                        <div className="draggable-field-header-left">
                                                                                            Param {index + 1}
                                                                                        </div>


                                                                                        <div className="draggable-field-header-left">
                                                                                            <Button
                                                                                                type="button"
                                                                                                icon="trash"
                                                                                                small={true}
                                                                                                minimal={true}
                                                                                                onClick={() => removeParameterFromParam(index, setFieldValue, values)}
                                                                                            >
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>

                                                                                    <Field
                                                                                        name={`params[${index}].value`}
                                                                                        component={Input}
                                                                                        title={`Value`}
                                                                                        placeholder={`Value`}
                                                                                    />


                                                                                    <Field
                                                                                        name={`params[${index}].label`}
                                                                                        component={Input}
                                                                                        title={`Label`}
                                                                                        placeholder={`Label`}
                                                                                    />

                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}

                                                                    <Button
                                                                        type="button"
                                                                        label="Add parameter"
                                                                        minimal={true}
                                                                        icon="plus"
                                                                        wrap={true}
                                                                        small={true}
                                                                        onClick={() => addParameterToParam(setFieldValue, values)}
                                                                    >
                                                                        Add Parameter
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </DragDropContext>

                                                </div>

                                                <Button
                                                    type="submit"
                                                    small={true}
                                                    label="Save"
                                                    wrap={true}
                                                />

                                            </Form>
                                        )
                                    }}
                                </Formik>}

                                <OverlayToaster ref={toasterRef} />
                            </div>
                        </div>


                    </div>

                </div>


            </div>
        </div>
    );
}

export default AlgoPageContainer;
