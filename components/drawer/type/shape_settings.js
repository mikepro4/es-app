import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "../../../components/form/BladeInput";
import Button from "../../../components/button";
import Select from "../../../components/form/Select";
import TabSwitcher from "../../../components/form/TabSwitcher";

import { shapeUpdateItem, algoSearch, updateCollectionItem, toggleDrawer, togglePlayer, toggleModal } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [localOptions, setLocalOptions] = useState([]);

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        console.log(values);

        dispatch(shapeUpdateItem({
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

    // let initialValues = {
    //     _id: app.drawerData._id,
    //     name: app.drawerData.name,
    //     algo: {value: "65639da4ca12be4343efa738", label: "Ethereal"}
    // }

    useEffect(() => {
        loadInitialOptions()

        return () => {
        };
    }, []);

    const statusOptions = [, {
        label: 'Approved',
        value: 'approved',
    }, {
            label: 'Rejected',
            value: 'rejected',
        }, {
            label: 'Potential',
            value: 'potential',
        }]

    const loadInitialOptions = () => {
        dispatch(algoSearch({
            criteria: {},
            sortProperty: "created",
            offset: 0,
            limit: 10000,
            order: 1,

            callback: (data) => {
                let finalOptinos =  data.all.map(option => {
                    return {
                        value: option._id,
                        label: option.name,
                    }
                });
                setLocalOptions(finalOptinos)
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
                                        title="Shape ID"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="name"
                                        component={Input}
                                        title="Name"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="algo._id"
                                        title="Algorithm"
                                        apiUrl="/algo/search"
                                        useAsync={true}
                                        component={Select}
                                        options={localOptions}
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
