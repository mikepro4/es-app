import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import TabSwitcher from "@/components/form/TabSwitcher";
import { AppToaster } from '@/components/toaster';

import { algoUpdateItem, toggleParamsData } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const keyboard = useSelector((state) => state.keyboard);
    const router = useRouter();
    const [activeKey, setActiveKey] = useState(false);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({});

    const showToast = useCallback((message) => {
        // Ensure AppToaster is not null before calling show
        if (AppToaster) {
          AppToaster.show({ message: message});
        }
    }, []);

    useEffect(() => {
        let key = keyboard.activeKeys[keyboard.activeKeys.length - 1]
        if (key) {
            setActiveKey(keyboard.activeKeys[keyboard.activeKeys.length - 1])
            setInitialValues({
                key: key
            })
        }

        return () => {

        };
    }, [keyboard]);

    const handleFormChange = (values) => {
        console.log(values);
        
        // set initial value ith the letter

        if(app.paramsData?.inputs) {
            let inputDetails = app.paramsData?.inputs[values.key]

            if(inputDetails) {
                 setInitialValues({
                    key: values.key,
                    param: inputDetails.param,
                    paramValue: inputDetails.paramValue,
                })
            } else {
                setInitialValues({
                    key: values.key,
                    param: null,
                    paramValue: null,
                })
            }
        }

       

        // setInitialValues({
        //     key: key
        // })

        // dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        console.log(values);

        let newItem = {
            ...app.paramsData,
            inputs: {
                ...app.paramsData.inputs,
                [values.key]: {
                    param: values.param,
                    paramValue: values.paramValue
                }
            }
        }

        dispatch(algoUpdateItem({
            data: newItem,
            callback: (response) => {
                console.log(response)
                dispatch(toggleParamsData(response))
                showToast("Algo saved")
            }
        }))

        console.log(newItem)


    };

    const keys = [
        {
            value: "Q",
            label: "Q"
        },
        {
            value: "W",
            label: "W"
        },
        {
            value: "E",
            label: "E"
        },
        {
            value: "R",
            label: "R"
        },
        {
            value: "T",
            label: "T"
        },
        {
            value: "Y",
            label: "Y"
        },
        {
            value: "U",
            label: "U"
        },
        {
            value: "I",
            label: "I"
        },
        {
            value: "O",
            label: "O"
        },
        {
            value: "P",
            label: "P"
        },
        {
            value: "A",
            label: "A"
        },
        {
            value: "S",
            label: "S"
        },
        {
            value: "D",
            label: "D"
        },
        {
            value: "F",
            label: "F"
        },
        {
            value: "G",
            label: "G"
        },
        {
            value: "H",
            label: "H"
        },
        {
            value: "J",
            label: "J"
        },
        {
            value: "K",
            label: "K"
        },
        {
            value: "L",
            label: "L"
        },
        {
            value: "Z",
            label: "Z"
        },
        {
            value: "X",
            label: "X"
        },
        {
            value: "C",
            label: "C"
        },
        {
            value: "V",
            label: "V"
        },
        {
            value: "B",
            label: "B"
        },
        {
            value: "N",
            label: "N"
        },
        {
            value: "M",
            label: "M"
        }
    ]

    const renderField = (fieldParam, handleChange) => {
        let getParam = app.paramsData?.params.find(param => param.value === fieldParam)
        // console.log("renderField", getParam && getParam.type)

        let fieldType = getParam && getParam.type

        if(fieldType == "string") {
            return (
                <Field
                    name="paramValue"
                    title="Param value"
                    component={TabSwitcher}
                    options={getParam?.enumParameters}
                />
            )
        }
       

    }

    const findParam = (key) => {
        if(app.paramsData && app.paramsData.inputs) {
            let paramValue = app.paramsData?.inputs[key]

            if(paramValue) {
                return true
            }
        }
    }

    const renderLetter = (letter) => {
        return (
            <div
                className={classNames("keyboard-key", {
                    "keyboard-key-active": keyboard.activeKeys.includes(letter),
                    "has-value": findParam(letter),
                })}
                onClick={() => {
                    setActiveKey(letter)
                    setInitialValues({
                        key: letter
                    })
                }}
                
            >{letter}</div>
        )
    }


    return (
        <div className="algo-inputs-container">
            <div className="keyboard-container">
                <div className="keyboard-row row-1">
                    {renderLetter("Q")}
                    {renderLetter("W")}
                    {renderLetter("E")}
                    {renderLetter("R")}
                    {renderLetter("T")}
                    {renderLetter("Y")}
                    {renderLetter("U")}
                    {renderLetter("I")}
                    {renderLetter("O")}
                    {renderLetter("P")}
                </div>
                <div className="keyboard-row row-2">
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("A"),
                        })}
                    >A</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("S"),
                        })}
                    >S</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("D"),
                        })}
                    >D</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("F"),
                        })}
                    >F</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("G"),
                        })}
                    >G</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("H"),
                        })}
                    >H</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("J"),
                        })}
                    >J</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("K"),
                        })}
                    >K</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("L"),
                        })}
                    >L</div>
                </div>
                <div className="keyboard-row row-3">
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("Z"),
                        })}
                    >Z</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("X"),
                        })}
                    >X</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("C"),
                        })}
                    >C</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("V"),
                        })}
                    >V</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("B"),
                        })}
                    >B</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("N"),
                        })}
                    >N</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("M"),
                        })}
                    >M</div>
                </div>
            </div>

            <div className="key-settings-container">
                {/* <div className="key-header-container">
                    <div className="key-settings-header-left">
                        {activeKey}
                    </div>
                    <div className="key-settings-header-right">
                    </div>
                </div> */}

                <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleSubmit }) => {
                        useEffect(() => {
                            handleFormChange(values);
                        }, [values]);

                        return (
                            <Form>
                                <div className="form-fields">
                                    <Field
                                        name="key"
                                        component={Select}
                                        title="Key"
                                        options={keys}
                                    />


                                    <Field
                                        name="param"
                                        title="Param type"
                                        component={Select}
                                        options={app.paramsData?.params}
                                    />

                                    {renderField(values.param, handleChange)}
                                </div>

                                <Button type="submit" label="Save" />

                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default AppSettings;
