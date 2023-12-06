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

import { toggleParamsValues } from "@/redux";

function ParamRenderer(props) {
    const [item, setItem] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {
        if(app.paramsValues) {
            
            let finalParams

            if(app.paramsValues) {
                finalParams = app.paramsValues
            } else {
                finalParams = props.item.params
            }
            if(!app.paramsData) {
                let newParams = props.item?.algo?.params.map((param, i) => {
                    if(param.type === 'array') {
                        return{
                            ...param,
                            values: finalParams[param.value]
                        }
                    }else {
                        return{
                            ...param,
                            defaultValue: finalParams[param.value]
                        }
                    }
                    
                })
    
                let newItem = {
                    ...props.item.algo,
                    params: newParams
                }
    
                setItem(newItem)
            } else {
                let newParams = app.paramsData.params.map((param, i) => {
                    if(param.type === 'array') {
                        return{
                            ...param,
                            values: finalParams[param.value]
                        }
                    }else {
                        return{
                            ...param,
                            defaultValue: finalParams[param.value]
                        }
                    }
                    
                })
    
                let newItem = {
                    ...app.paramsData,
                    params: newParams
                }
    
                setItem(newItem)
            }
            

        } else {
            setItem(app.paramsData);
        }

        return () => {

        };
    }, [app.paramsData, app.paramsValues]);

    useEffect(() => {
        console.log("item", props.item)
    }, [item]);

    const getLabelStepSize = (min, max) => {
        const stepSize = (Math.abs(min) + Math.abs(max)) / 4;
        // console.log("stepSize", stepSize)
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
                // return (<Field
                //     component={Slider}
                //     name={name}
                //     min={Number(param.minValue)}
                //     max={Number(param.maxValue)}
                //     step={Number(param.stepValue)}
                //     labelStepSize={getLabelStepSize(param.minValue, param.maxValue)}
                //     displayName={param.label}
                // />)
                return (
                    <Field
                        component={Input}
                        name={name}
                        title={param.label}
                        placeholder={param.label}
                    />)
            default:
                return null;
        }
    }

    const renderArrayParameters = (param, index, values, setFieldValue) => {

        return (
            <div className="array-values-container">
                <div className="array-group-header">{param.label}</div>

                <FieldArray
                    name={`params[${index}].values`}
                    render={arrayHelpers => (
                        <div className="field-array-container">
                            {values.params[index].values?.map((color, i) => (
                                <div key={i} >

                                    <div className="field-array-header">
                                        <div className="field-array-title">Option {i + 1}</div>

                                        <Button
                                            type="button"
                                            small={true}
                                            minimal={true}
                                            icon="trash"
                                            onClick={() => arrayHelpers.remove(i)} // remove a color from the list
                                        />
                                    </div>

                                    <div className="field-array-content">

                                        {values.params[index].arrayParameters?.map((arrayParam, arrayIndex) => (
                                            <div key={arrayIndex}>
                                                {renderParameterField(
                                                    arrayParam,
                                                    index,
                                                    setFieldValue,
                                                    values,
                                                    `params[${index}].values[${i}][${param.arrayParameters[arrayIndex].value}]`,
                                                    values.params[index].arrayParameters[arrayIndex].enumParameters
                                                )}
                                            </div>
                                        ))}
                                        {/* <Field
                                            name={`params[${index}].values[${i}][${param.arrayParameters[0].value}]`}
                                            placeholder="Color"
                                            component={ColorPicker}
                                        />

                                        <Field
                                            name={`params[${index}].values[${i}][${param.arrayParameters[1].value}]`}
                                            displayName="Amount"
                                            component={Slider}
                                            min={0}
                                            max={100}
                                            step={1}
                                            labelStepSize={50}
                                        /> */}

                                    </div>

                                </div>
                            ))}
                            <div className="field-array-add-button">
                                <Button
                                    type="button"
                                    icon="plus"
                                    small={true}
                                    minimal={true}
                                    label="Add option value"
                                    onClick={() => {


                                        const paramsToPush = param.arrayParameters?.reduce((obj, item) => {
                                            obj[item.value] = item.defaultValue;
                                            return obj;
                                        }, {});


                                        arrayHelpers.push(paramsToPush)
                                    }}
                                />
                            </div>
                        </div>
                    )}
                />
                {/* {param.arrayParameters?.map((arrayParam, i) => {
                    console.log("arrayParam", arrayParam, i)
                    return (
                        <div key={i} className="array-item">
                            {renderParameterField(arrayParam, i, setFieldValue, values, `params[${index}].arrayParameters[${i}].defaultValue`, values?.params[index].arrayParameters[i].enumParameters)}
                        </div>
                    )
                })} */}
            </div>
        )
    };

    const renderParameterField = (param, index, setFieldValue, values, name, options) => {
        // console.log(param, index, setFieldValue, values, name, options)
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
                return <Field component={SwitchField} label={param.label} name={name} /* ...other props */ />;
            case 'array':
                // Render a custom component to handle array values
                return renderArrayParameters(param, index, values, setFieldValue);
            case 'color':
                // Render ColorPicker component
                return <Field component={ColorPicker} title={param.label} name={name} /* ...other props */ />;
            // Add more cases for other types if needed
            default:
                return null;
        }
    };


    const handleFormChange = (values) => {
        console.log(values);
        console.log("parseValues", parseValues(values))
        // if(parseValues(values) && parseValues(values).length > 0) {
         // Check if every value is truthy (not null, not undefined, not false, etc.)
            // If 'values' has at least one key-value pair
            // Assuming parseValues returns an object and you want to check it as well
        dispatch(toggleParamsValues(parseValues(values)));
        // }

        
        // dispatch(testListChangeCriteria(values))
    };

    const parseValues = (values) => {
        // let newValues = values.map((value, i) => {
        //     if (value.type === 'array') {
        //         return {
        //             [value.labe]: value.values,
        //         }
        //     } else {
        //         return {
        //             [value.label]: value.defaultValue
        //         }
        //     }
        // })

        const paramsToPush = values.params.reduce((obj, item) => {
            if (item.type === 'array') {
                obj[item.value] = item.values;
            } else {
                obj[item.value] = item.defaultValue;
            }
            return obj;
        }, {});

        return paramsToPush
    }




    let initialValues = item

    const handleSubmit = (values) => {


    };


    if (!item) return null;

    return (
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
                                    <div key={index}>
                                        {renderParameterField(param, index, setFieldValue, values, `params[${index}].defaultValue`)}
                                        {/* Add your add/remove buttons here */}
                                    </div>
                                ))}
                            </div>



                        </Form>
                    )
                }}
            </Formik>
    );
}

export default ParamRenderer;
