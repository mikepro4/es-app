import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Select from "@/components/form/Select";
import Button from "@/components/button";

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";

import { useFormik } from 'formik';

import TracksDetails from "@/components/collectionControls/tracksDetails";

import { trackListChangeCriteria, trackResetCriteria, trackCreate } from "@/redux"

import { updatedFinalJSON } from "./updatedFinalJSON";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const trackList = useSelector((state) => state.trackList);
    const router = useRouter();
    const [formLoaded, setFormLoaded] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        search: trackList.criteria?.search,
        status: trackList.criteria?.status,
    }

    const handleFormChange = (values, data) => {
        if(formLoaded) {
            dispatch(trackListChangeCriteria(values))
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
        search: trackList.criteria?.search || '',
        status: trackList.criteria?.status || '',
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        onSubmit: handleSubmit,
        enableReinitialize: true, // This is important to reset form when initialValues change
    });

    useEffect(() => {
        // Update Formik's initialValues when trackList.criteria changes
        formik.setValues(getInitialValues());
    }, [trackList.criteria]);

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
            <TracksDetails />

            {/* <Button
                label="Add all tracks"
                onClick={() => {
                    console.log(updatedFinalJSON)

                    updatedFinalJSON.forEach((track) => {

                         dispatch(
                            trackCreate(
                              {
                                name: track.ngc,
                                album: track.album, 
                                songLink: track.ipfsLink,
                                callback: (data) => {
                                  toasterRef.current.show({ message: `${data.name} was created` });
                                  dispatch(updateCollection(true))
                                }
                              },)
                          )
                    })

                       
                }}
            /> */}

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
                                        dispatch(trackResetCriteria())
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
