import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "../../../components/form/BladeInput";
import Button from "../../../components/button";
import TabSwitcher from "../../../components/form/TabSwitcher"
import {
    Switch,
} from "@blueprintjs/core";;

import { hardwareUpdateItem, updateCollectionItem, hardwareUpdateManyItems, toggleDrawer, togglePlayer, toggleModal } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        console.log(values);

        dispatch(hardwareUpdateItem({
            data: values,
            callback: (data) => {
                dispatch(updateCollectionItem(data._id))

                dispatch(toggleDrawer({
                    drawerOpen: false,
                    drawerType: null,
                    drawerData: null,
                }))
            }
        }))
    };

    let initialValues = app.drawerData

    useEffect(() => {

        return () => {

        };
    }, []);

    const statusOptions = [, {
        label: 'Active',
        value: 'active',
    }, {
            label: 'Inactive',
            value: 'inactive',
        }]

    const handleDefaultChange = (event) => {

        let value = event.target.checked

        dispatch(hardwareUpdateManyItems({
            newCriteria: {
                default: false
            },
            callback: (data) => {

                dispatch(hardwareUpdateItem({
                    data: {
                        ...app.drawerData,
                        default: value
                    },
                    callback: (data) => {
                        dispatch(updateCollectionItem(app.drawerData._id))
                        dispatch(toggleDrawer({
                            drawerOpen: true,
                            drawerType: "hardware-settings",
                            drawerData: data,
                        }))
                    }
                })

                )


            }
        }))
    }

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container"}>
                <Formik
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
                                        name="_id"
                                        component={Input}
                                        title="Hardware ID"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="name"
                                        component={Input}
                                        title="Name"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="status"
                                        title="Status"
                                        component={TabSwitcher}
                                        options={statusOptions}
                                    />

                                </div>

                                <Button
                                    type="submit"
                                    label="Save"
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

           

            </div>
        </div>
    );
}

export default AppSettings;
