
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { Form, Field, FormSpy } from 'react-final-form';

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

    const handleFormChange = (formState) => {
        console.log(formState.values); // Access updated form values here
        // Perform any action based on formState.values
    };

    const initialValues = {
        parameter: 0, // Assuming you want the initial value of the slider to be 50
        // Add initial values for other fields as needed
    };

    // let formApi;

    // const setFormValueExternally = (fieldName, value) => {
    //     if (formApi) {
    //         formApi.change(fieldName, value);
    //     }
    // };




    return (
        <div className="form-container">

            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitting, pristine, values }) => {
                    // formApi = form;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form-fields">
                                {/* <Field
                                    name="email"
                                    title="Email address"
                                    component={Input}
                                    onFocus={() => {
                                        if (onFocus) onFocus()
                                    }}
                                    placeholder="Email address"
                                    onChange={(value) => {
                                        setEmail(value.nativeEvent.text)
                                    }}
                                    validate={validateEmail}
                                />

                                <Field
                                    name="password"
                                    title="Password"
                                    component={Input}
                                    onFocus={() => {
                                        if (onFocus) onFocus()
                                    }}
                                    placeholder="Password"
                                    onChange={(value) => {
                                        setPassword(value.nativeEvent.text)
                                    }}
                                    type={"password"}
                                    validate={validatePassword}
                                />

                                <Field
                                    name="agree"
                                    label="Agree to something"
                                    onChange={(value) => {
                                        console.log(value)
                                        // setAgree(value.nativeEvent.checked)
                                    }}
                                    component={BlueprintCheckbox}
                                /> */}

                                <Field
                                    name="parameter"
                                    component={Slider}
                                    labelStepSize={100}
                                    sliderMin={-100}
                                    sliderMax={100}
                                />
                            </div>

                            <Button
                                type="submit"
                                label="Sign up"
                                onClick={handleSubmit}
                            />

                            <FormSpy onChange={handleFormChange} />

                        </form>
                    )
                    
                }}
            />


        </div>
    );
};

export default SingleForm;
