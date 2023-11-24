import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import TabSwitcher from "../../../components/form/TabSwitcher";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "../../../components/form/BladeInput";

import ParamSwitch from "@/components/paramSwitch";
import { toggleDrawer } from "@/redux";
import Button from "@/components/button";

import { useFormik } from 'formik';

import { updateCollection, testListChangeSort, testListChangeCriteria, testResetCriteria } from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const testList = useSelector((state) => state.testList);
    const router = useRouter();
    const dispatch = useDispatch();

    const [sortValue, setSortValue] = useState();

    useEffect(() => {

        if (testList.sortProperty == "created" && testList.order == "-1") {
            setSortValue("recent")
        }

        if (testList.sortProperty == "created" && testList.order == "1") {
            setSortValue("oldest")
        }

        if (testList.sortProperty == "name" && testList.order == "-1") {
            setSortValue("name")
        }

        return () => {

        };
    }, []);

    const initialValues = {
        search: testList.criteria?.search,
        status: testList.criteria?.status,
    }

    const handleFormChange = (values) => {
        // console.log(values);
        dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        // console.log(values);

        // dispatch(
        //     signup({
        //         email: values.email,
        //         password: values.password,
        //         callback: async (data) => {
        //             dispatch(fetchUserInfo());
        //             router.push("/");
        //         },
        //     }))
    };

    const getInitialValues = () => ({
        search: testList.criteria?.search || '',
        status: testList.criteria?.status || '',
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        onSubmit: handleSubmit,
        enableReinitialize: true, // This is important to reset form when initialValues change
    });

    useEffect(() => {
        // Update Formik's initialValues when testList.criteria changes
        formik.setValues(getInitialValues());
    }, [testList.criteria]);

    const statusOptions = [{
        name: 'Unreviewed',
        value: 'unreviewed',
    }, {
        name: 'Approved',
        value: 'approved',
    }, {
        name: 'Potential',
        value: 'potential',
    }]

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"collection-settings-container"}>
                <div className="collection-settings-header">

                    <div className="collection-settings-header-left">
                        <span className="collection-count-number">{testList.count}</span>
                        <span className="collection-count-total">of {testList.total} items</span>
                    </div>

                    <div className="collection-settings-header-right">
                        <ParamSwitch
                            label="Sort by:"
                            value={sortValue}
                            position="bottom left"
                            offset={[20, 0]}
                            params={[
                                {
                                    values: [
                                        {
                                            label: "Recent",
                                            value: "recent",
                                        },
                                        {
                                            label: "Oldest",
                                            value: "oldest",
                                        },
                                        {
                                            label: "Name",
                                            value: "name",
                                        }
                                    ],
                                }
                            ]}
                            onChange={(value) => {
                                setSortValue(value);
                                dispatch(testListChangeSort(value))

                            }}
                        />
                    </div>

                </div>

                <div className="form-container">

                    <Formik
                        enableReinitialize
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
                                            name="search"
                                            component={Input}
                                            title="Search"
                                            placeholder="Search"
                                        />

                                        <Field
                                            name="status"
                                            title="Status"
                                            component={TabSwitcher}
                                            options={statusOptions}
                                        />

                                        <Button
                                            type="button"
                                            icon="filter-remove"
                                            small={true}
                                            minimal={true}
                                            wrap={true}
                                            label="Clear filters"
                                            onClick={() => {
                                                dispatch(testResetCriteria())
                                            }}
                                        />

                                    </div>

                                </Form>
                            )
                        }}
                    </Formik>
                </div>

            </div>
        </div>
    );
}

export default AppSettings;
