
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { Formik, Form, Field } from 'formik';

import Input from "../../../components/form/BladeInput";
import BlueprintCheckbox from "../../../components/form/BlueprintCheckbox";
import Slider from "../../../components/form/Slider";

import Button from "../../../components/button";



const SingleForm = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const onSubmit = (values) => {
        console.log(values)
    };

    const validateEmail = value => {
        if (!value) return "Email is required";

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
        }
    };

    const validatePassword = value => {
        if (!value) return "Password is required";
    }

    const handleFormChange = (values) => {
        console.log(values); 
    };

    const initialValues = {
        parameter: 20, // Assuming you want the initial value of the slider to be 50
        // Add initial values for other fields as needed
    };

    const handleSubmit = (values) => {
        console.log(values); // Process form submission
    };


    return (
        <div className="form-container">

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange, handleSubmit })  => (
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
                                onChange={() => handleFormChange(values)}
                            />
                        </div>
                        


                        <Button
                            type="submit"
                            label="Sign up"
                        />
                    </Form>
                )}
            </Formik>


        </div>
    );
};

export default SingleForm;
