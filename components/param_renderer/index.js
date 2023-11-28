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
}) {
    const [item, setItem] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();

    useEffect(() => {

        setItem(app.paramsData);

        return () => {

        };
    }, [app.paramsData]);

    const getLabelStepSize = (min, max) => {
        const stepSize = (Math.abs(min) + Math.abs(max)) / 4;
        console.log("stepSize", stepSize)
        return stepSize;
    }

    const renderString = (param, index, values, name, options) => {
        switch (param.view) {
            case 'tab':
                return (<Field
                    name={name}
                    title="View type"
                    component={TabSwitcher}
                    options={options ? options : values?.params[index].enumParameters}
                />)
            case 'dropdown':
                return (<Field
                    component={Select}
                    name={name}
                    title={param.label}
                    options={options ? options : values?.params[index].enumParameters}
                />)
            default:
                return null;
        }
    }

    const renderNumber = (param, index, values, name) => {
        switch (param.view) {
            case 'input':
                return (
                    <Field
                        component={Input}
                        name={name}
                        title={param.label}
                        placeholder={param.label}
                    />)
            case 'slider':
                return (<Field
                    component={Slider}
                    name={`params[${index}].defaultValue`}
                    min={Number(param.minValue)}
                    max={Number(param.maxValue)}
                    step={Number(param.stepValue)}
                    labelStepSize={getLabelStepSize(param.minValue, param.maxValue)}
                    displayName={param.label}
                />)
            default:
                return null;
        }
    }

    const renderArrayParameters = (param, index, values, setFieldValue) => {
        return (
            <>
                {param.arrayParameters?.map((arrayParam, i) => {
                    console.log("arrayParam", arrayParam, i)
                    return (
                        <div key={i} className="array-item">
                            {renderParameterField(arrayParam, i, setFieldValue, values, `params[${index}].arrayParameters[${i}].defaultValue`, values?.params[index].arrayParameters[i].enumParameters)}
                        </div>
                    )
                })}
            </>
        )
    };

    const renderParameterField = (param, index, setFieldValue, values, name, options) => {
        switch (param.type) {
            case 'string':
                // Render Input component
                return renderString(param, index, values, name, options)
            case 'number':
                // Render Input component for number
                // return <Field component={Input} name={`params[${index}].defaultValue` }title={param.label} placeholder={param.label}  />;
                return renderNumber(param, index, values, name);
            case 'boolean':
                // Render SwitchField component
                return <Field component={SwitchField} label={param.label} name={`params[${index}].defaultValue`} /* ...other props */ />;
            case 'array':
                // Render a custom component to handle array values
                return renderArrayParameters(param, index, values, setFieldValue);
            case 'color':
                // Render ColorPicker component
                return <Field component={ColorPicker} name={`params[${index}].defaultValue`} /* ...other props */ />;
            // Add more cases for other types if needed
            default:
                return null;
        }
    };


    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };




    let initialValues = item

    const handleSubmit = (values) => {


    };


    if (!item) return null;

    return (
        <div className="param-list-container">
            <Formik
                enableReinitialize
                initialValues={item}
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
                                        {renderParameterField(param, index, setFieldValue, values, `params[${index}].defaultValue`)}
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
