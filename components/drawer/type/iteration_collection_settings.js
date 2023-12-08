import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import TabSwitcher from "../../../components/form/TabSwitcher";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "../../../components/form/BladeInput";

import { toggleDrawer } from "@/redux";
import Button from "@/components/button";
import _ from 'lodash';

import { useFormik } from 'formik';

import { 
    updateCollection, 
    iterationListChangeCriteria, 
    iterationResetCriteria, 
    iterationCreate,
} from "@/redux"

import IterationChangeSort from "@/components/collection_actions/iterationChangeSort"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const iterationList = useSelector((state) => state.iterationList);
    const [formLoaded, setFormLoaded] = useState(false);


    const initialValues = {
        search: iterationList.criteria?.search,
        status: iterationList.criteria?.status,
    }

    const handleFormChange = (values, data) => {
        if (formLoaded) {
            dispatch(iterationListChangeCriteria(values))
        }
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

    useEffect(() => {
        setTimeout(() => {
            setFormLoaded(true)
        }, 500)
    }, []);

    const getInitialValues = () => ({
        search: iterationList.criteria?.search || '',
        status: iterationList.criteria?.status || '',
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        onSubmit: handleSubmit,
        enableReinitialize: true, // This is important to reset form when initialValues change
    });

    useEffect(() => {
        // Update Formik's initialValues when iterationList.criteria changes
        formik.setValues(getInitialValues());
    }, [iterationList.criteria]);

    const statusOptions = [{
        label: 'Unreviewed',
        value: 'unreviewed',
    }, {
        label: 'Approved',
        value: 'approved',
    }, {
        label: 'Potential',
        value: 'potential',
    }, {
        label: 'Rejected',
        value: 'rejected',
    }]

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"collection-settings-container"}>
                <div className="collection-settings-header">

                    <div className="collection-settings-header-left">
                        <span className="collection-count-number">{iterationList.count}</span>
                        <span className="collection-count-total">of {iterationList.total} items</span>
                    </div>

                    <div className="collection-settings-header-right">
                        <IterationChangeSort />
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

                                        <ul className="action-buttons">
                                            <li>
                                                <Button
                                                    type="button"
                                                    icon="filter-remove"
                                                    small={true}
                                                    minimal={true}
                                                    wrap={true}
                                                    label="Clear filters"
                                                    onClick={() => {
                                                        dispatch(iterationResetCriteria())
                                                    }}
                                                />
                                            </li>


                                        </ul>





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
