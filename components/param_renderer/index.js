import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from 'formik';

import Input from "@/components/form/BladeInput";
import Select from "@/components/form/Select";
import Slider from "@/components/form/Slider";
import SwitchField from "@/components/form/Switch";
import ColorPicker from "@/components/form/ColorPicker";
import TabSwitcher from "@/components/form/TabSwitcher";
import Button from "@/components/button";

function ParamRenderer({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();

    useEffect(() => {

        return () => {

        };
    }, []);

    const renderParameterField = (param, index, setFieldValue, values) => {
        switch (param.type) {
            case 'string':
                // Render Input component
                return <Field component={Select} name={`params[${index}].value`} title={param.label}  options={values?.params[index].enumParameters} /* ...other props */ />;
            case 'number':
                // Render Input component for number
                // return <Field component={Input} name={`params[${index}].defaultValue` }title={param.label} placeholder={param.label}  />;
                return <Field 
                    component={Slider} 
                    name={`params[${index}].defaultValue` }
                    min={Number(param.minValue)}
                    max={Number(param.maxValue)}
                    step={Number(param.stepValue)}
                    labelStepSize={10}
                    displayName={param.label} 
                />;
            case 'boolean':
                // Render SwitchField component
                return <Field component={SwitchField} name={`params[${index}].value`} /* ...other props */ />;
            case 'array':
                // Render a custom component to handle array values
                return renderArrayParameters(param, index, values, setFieldValue);
            case 'color':
                // Render ColorPicker component
                return <Field component={ColorPicker} name={`params[${index}].value`} /* ...other props */ />;
            // Add more cases for other types if needed
            default:
                return null;
        }
    };


    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };


    const renderArrayParameters = (param, index, values, setFieldValue) => {
        // Logic to render array parameters and add/remove buttons
    };

    let initialValues = item

    const handleSubmit = (values) => {

      
    };


    if (!item) return null;

    return (
        <div className="param-list-container">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => {

                    useEffect(() => {
                        handleFormChange(values);
                    }, [values]);

                    return (
                        <Form
                        >
                            <div className="form-fields">
                                {values.params.map((param, index) => (
                                    <div key={param.id}>
                                        {renderParameterField(param, index, setFieldValue, values)}
                                        {/* Add your add/remove buttons here */}
                                    </div>
                                ))}
                            </div>



                        </Form>
                    )
                }}
            </Formik>


            <div className="placeholder"></div>
        </div>
    );
}

export default ParamRenderer;
