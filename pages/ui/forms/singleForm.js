
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { Form, Field, FormSpy } from 'react-final-form';

import Input from "../../../components/form/BladeInput";
import Button from "../../../components/button";



const SingleForm = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const onSubmit = () => {
        dispatch(signin({ email, password }))
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



    return (
        <div className="form-container">

            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-fields">
                            <Field
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
                                    setEmail(value.nativeEvent.text)
                                }}
                                type={"password"}
                                validate={validatePassword}
                            />
                        </div>

                        <Button
                            type="submit"
                            label="Sign up"
                            onClick={handleSubmit}
                        />

                    </form>
                )}
            />


        </div>
    );
};

export default SingleForm;
