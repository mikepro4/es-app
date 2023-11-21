
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import * as Yup from 'yup';

import { Formik, Form, Field } from 'formik';

import Input from "../../../components/form/BladeInput";
import BlueprintCheckbox from "../../../components/form/BlueprintCheckbox";
import Slider from "../../../components/form/Slider";

import Button from "../../../components/button";



const SingleForm = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        parameter: "20", 
        agree: false
    };

    const validationSchema = Yup.object().shape({
        parameter: Yup.number(),
        email: Yup.string()
                  .email("Invalid email address") // Validates that the value is a valid email
                  .required("Email is required"), // Ensures that the field is not empty
    });

    const handleFormChange = (values) => {
        console.log(values);
    };

    const handleSubmit = (values) => {
        console.log(values); // Process form submission
    };

    return (
        <div className="form-container">

            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
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
                                    name="parameter"
                                    displayName="Parameter"
                                    component={Slider}
                                    min={-100}
                                    max={100}
                                    step={0.1}
                                    labelStepSize={50}
                                />

                                <Field
                                    name="parameter"
                                    component={Input}
                                    title="Parameter value"
                                    placeholder="Parameter value"
                                />


                                <Field
                                    name="email"
                                    component={Input}
                                    title="Email address"
                                    placeholder="Email address"
                                />

                                <Field
                                    name="agree"
                                    component={BlueprintCheckbox}
                                    label="Agree"
                                />
                            </div>

                            <Button
                                // type="submit"
                                label="Sign up"
                            />
                        </Form>
                    )
                }}
            </Formik>


        </div>
    );
};

export default SingleForm;
