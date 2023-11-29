import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Select from "@/components/form/Select";
import Button from "@/components/button";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";

import { useFormik } from 'formik';

import TiersDetails from "@/components/collectionControls/tiersDetails";

import { tierListChangeCriteria, tierResetCriteria } from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const tierList = useSelector((state) => state.tierList);
    const router = useRouter();
    const [formLoaded, setFormLoaded] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        search: tierList.criteria?.search,
        status: tierList.criteria?.status,
    }

    const handleFormChange = (values, data) => {
        if(formLoaded) {
            dispatch(tierListChangeCriteria(values))
        }
    };

    const handleSubmit = (values) => {
 
    };


    useEffect(() => {

        setTimeout(() => {
            setFormLoaded(true)
        }, 500)

        return () => {

        };
    }, []);

    const getInitialValues = () => ({
        search: tierList.criteria?.search || '',
        status: tierList.criteria?.status || '',
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        onSubmit: handleSubmit,
        enableReinitialize: true, // This is important to reset form when initialValues change
    });

    useEffect(() => {
        // Update Formik's initialValues when tierList.criteria changes
        formik.setValues(getInitialValues());
    }, [tierList.criteria]);

    const statusOptions = [{
        label: 'Active',
        value: 'active',
        icon: 'tick',
    }, {
        label: 'Inactive',
        value: 'inactive',
        icon: 'cross',
    }]

    return (
        <div className="collection-sidebar">
            <TiersDetails />

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
                            className="sidebar-form"
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
                                    component={Select}
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
                                        dispatch(tierResetCriteria())
                                    }}
                                />

                            </div>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default AppSettings;
