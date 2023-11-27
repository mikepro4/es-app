import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";

import AlgoActionsView from "@/components/collection_actions/algoActions";

import { algoUpdateItem, updateCollectionItem, algoItem } from "@/redux";

import {
    OverlayToaster,
  } from "@blueprintjs/core";

function AlgoPageContainer({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef(null)

    const [algo, setAlgo] = useState(false);

    const fetchItem = () => {
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
        fetchItem()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem == algo?._id) {
            fetchItem()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.algoId !== algo?.id) {
            fetchItem()
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
        slug: algo?.slug
    }

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


                <div className="algo-preview"></div>

                <div className="algo-form">
                    {algo && algo._id && <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
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
                                            name="slug"
                                            component={Input}
                                            title="Slug"
                                            placeholder="Slug"
                                        />


                                    </div>

                                    <Button
                                        type="submit"
                                        label="Save"
                                        minimal={true}
                                        wrap={true}
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
                    </Formik>}

                    <OverlayToaster ref={toasterRef} />
                </div>



                <div className="placeholder"></div>


            </div>
        </div>
    );
}

export default AlgoPageContainer;
