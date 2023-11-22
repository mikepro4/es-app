
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import * as Yup from 'yup';

import { Formik, Form, Field, FieldArray } from 'formik';

import Input from "../../../components/form/BladeInput";
import BlueprintCheckbox from "../../../components/form/BlueprintCheckbox";
import Slider from "../../../components/form/Slider";
import TabSwitcher from "../../../components/form/TabSwitcher";
import ColorPicker from "../../../components/form/ColorPicker";
import Select from "../../../components/form/Select";

import Button from "../../../components/button";



const SingleForm = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        parameter: 20,
        agree: false,
        math: 'sin',
        background: 'rgba(255, 0, 0, 1)',
        colors: []
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

    // const tabOptions = ['Tab1', 'Tab2', 'Tab3'];
    const tabOptions = [{
        name: 'Sin',
        value: 'sin',
    }, {
        name: 'Cos',
        value: 'cos',
    }, {
        name: 'Tan',
        value: 'tan',
    }, {
        name: 'Atan',
        value: 'atan',
    }, {
        name: 'Log',
        value: 'log',
    }];

    const selectOptions = [
        { value: 'chocolate', label: 'Chocolate', icon: 'circle' },
        { value: 'strawberry', label: 'Strawberry', icon: 'home'  },
        { value: 'vanilla', label: 'Vanilla', icon: 'globe'  }
      ];

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
                                    name="element"
                                    title="Element"
                                    options={selectOptions}
                                    component={Select}
                                />

                                <Field
                                    name="elements"
                                    title="Multiple elements"
                                    options={selectOptions}
                                    component={Select}
                                    isMulti={true}
                                />

                                <Field
                                    name="asyncelements"
                                    title="Async elements"
                                    apiUrl="https://mikhailcoapi.herokuapp.com/NFTs/search"
                                    useAsync={true}
                                    options={selectOptions}
                                    component={Select}
                                />

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

                                <Field
                                    name="math"
                                    title="Math"
                                    component={TabSwitcher}
                                    options={tabOptions}
                                />

                                <Field
                                    name="background"
                                    title="Background"
                                    component={ColorPicker}
                                />

                                <div className="field-array-wrapper">
                                    <div className="field-array-label">Colors</div>
                                    <div className="field-array-container">
                                        <FieldArray
                                            name="colors"
                                            render={arrayHelpers => (
                                                <div>
                                                    {values.colors.map((color, index) => (
                                                        <div key={index}>

                                                            <div className="field-array-header">
                                                                <div className="field-array-title">Color {index + 1}</div>

                                                                <Button
                                                                    type="button"
                                                                    small={true}
                                                                    minimal={true}
                                                                    icon="trash"
                                                                    onClick={() => arrayHelpers.remove(index)} // remove a color from the list
                                                                />
                                                            </div>

                                                            <div className="field-array-content">
                                                                <Field
                                                                    name={`colors.${index}.color`}
                                                                    placeholder="Color"
                                                                    component={ColorPicker}
                                                                />

                                                                <Field
                                                                    name={`colors.${index}.amount`}
                                                                    displayName="Amount"
                                                                    component={Slider}
                                                                    min={0}
                                                                    max={100}
                                                                    step={1}
                                                                    labelStepSize={50}
                                                                />

                                                            </div>

                                                        </div>
                                                    ))}
                                                    <div className="field-array-add-button">
                                                        <Button
                                                            type="button"
                                                            minimal={true}
                                                            label="Add a Color"
                                                            onClick={() => arrayHelpers.push({ color: 'rgba(0,0,0,1)', amount: 20, opacity: 100 })}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                
                            </div>

                            <Button
                                // type="submit"
                                label="Sign up"
                            />
                        </Form>
                    )
                }}
            </Formik>

            <div className="placeholder"></div>


        </div>
    );
};

export default SingleForm;
