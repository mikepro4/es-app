import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import TabSwitcher from "@/components/form/TabSwitcher";
import Slider from "@/components/form/Slider";

import {
    Switch,
} from "@blueprintjs/core";

import { updateCurrentFrame, toggleGeneratorSave } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
        dispatch(updateCurrentFrame(Number(values.iteration)))
    };

    const handleSubmit = (values) => {
        console.log(values);

        dispatch(
            shapeUpdateItem({
                data: values,
                callback: (data) => {
                    dispatch(updateCollectionItem(data._id));

                    dispatch(
                        toggleDrawer({
                            drawerOpen: false,
                            drawerType: null,
                            drawerData: null,
                        })
                    );
                },
            })
        );
    };

    let initialValues = {
        iteration: app.drawerData.iteration,
    };



    useEffect(() => {

        return () => {

        };
    }, []);

    const handleAutoSaveChange = (event) => {

        let value = event.target.checked

        dispatch(toggleGeneratorSave(value))

    }

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container"}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleSubmit }) => {
                        useEffect(() => {
                            handleFormChange(values);
                        }, [values]);

                        return (
                            <Form>
                                <div className="form-fields">

                                    <Field
                                        name="iteration"
                                        component={Input}
                                        title="Iteration"
                                        placeholder="Iteration"
                                    />

                                    <Field
                                        component={Slider}
                                        name="iteration"
                                        min={0}
                                        max={Number(app.drawerData.iterations)}
                                        step={1}
                                        labelStepSize={Number(app.drawerData.iterations) / 3}
                                        displayName={"Iterations"}
                                    />

                                </div>

                                {/* <Button type="submit" label="Save" /> */}

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
                        );
                    }}
                </Formik>

                <div className="switch-container">
                    <Switch
                        checked={app.generatorSave}
                        onChange={handleAutoSaveChange}
                    />
                    <span>Auto save</span>
                </div>

            </div>
        </div>
    );
}

export default AppSettings;
