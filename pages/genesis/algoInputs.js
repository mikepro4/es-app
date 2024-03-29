import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import TabSwitcher from "@/components/form/TabSwitcher";
import TabBar from "@/components/tab";
import { AppToaster } from '@/components/toaster';

import { algoUpdateItem, toggleParamsData, toggleParamsValues } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const keyboard = useSelector((state) => state.keyboard);
    const router = useRouter();
    const [activeKey, setActiveKey] = useState(false);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({});
    const [selectedSection, setSelectedSection] = useState(1);
    const [selectedTouchRow, setSelectedTouchRow] = useState(1);

    const showToast = useCallback((message) => {
        // Ensure AppToaster is not null before calling show
        if (AppToaster) {
            AppToaster.show({ message: message });
        }
    }, []);

    useEffect(() => {
        let key = keyboard.activeKeys[keyboard.activeKeys.length - 1]
        if (key && selectedSection == 1) {
            setActiveKey(keyboard.activeKeys[keyboard.activeKeys.length - 1])
            setInitialValues({
                key: key
            })

            // dispatch(toggleParamsValues({
            //     ...app.paramsValues,
            //     math: "sin"
            // }
            // ))
        }

        return () => {

        };
    }, [keyboard]);

    const handleFormChange = (values) => {
        console.log(values);

        // set initial value ith the letter

        if (app.paramsData?.inputs) {
            let inputDetails = app.paramsData?.inputs[values.key]

            if (inputDetails) {
                setInitialValues({
                    key: values.key,
                    param: inputDetails.param,
                    paramValue: inputDetails.paramValue,
                    paramType: inputDetails.paramType,
                    paramStepValue: inputDetails.paramStepValue,
                    paramShiftStepValue: inputDetails.paramShiftStepValue,
                })
            } else {
                setInitialValues({
                    key: values.key,
                    param: null,
                    paramValue: null,
                    paramType: null,
                    paramStepValue: null,
                    paramShiftStepValue: null,
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
            _id: router.query.algoId,
            inputs: {
                ...app.paramsData.inputs,
                [values.key]: {
                    param: values.param,
                    paramValue: values.paramValue,
                    paramType: values.paramType,
                    paramStepValue: values.paramStepValue,
                    paramShiftStepValue: values.paramShiftStepValue,
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

    const handleReset = (keyToRemove) => {
        // Log the key to be removed
        console.log("Removing key:", keyToRemove);

        // Clone the current app.paramsData
        let updatedItem = {
            ...app.paramsData,
            inputs: {
                ...app.paramsData.inputs
            }
        };

        // Check if the key exists in the inputs object
        if (updatedItem.inputs.hasOwnProperty(keyToRemove)) {
            // Delete the key from the inputs object
            delete updatedItem.inputs[keyToRemove];

            // Dispatch the update action
            dispatch(algoUpdateItem({
                data: updatedItem,
                callback: (response) => {
                    console.log(response);
                    dispatch(toggleParamsData(response));
                    showToast("Key removed");
                    setInitialValues({
                        key: keyToRemove,
                        param: null,
                        paramValue: null,
                        paramType: null,
                    })
                }
            }));
        } else {
            // Log or handle the case where the key does not exist
            console.log("Key not found:", keyToRemove);
            showToast("Key not found");
        }

        // Log the updated item for debugging
        console.log(updatedItem);
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
        let getParam = app.paramsData?.params.find(param => param.value === fieldParam.param)
        // console.log("renderField", getParam && getParam.type)

        let fieldType = getParam && getParam.type

        // if(
        //     fieldParam.paramType == "setValue" 
        // ) {
        //     return (
        //         <Field
        //             name="paramValue"
        //             title="Param value"
        //             component={TabSwitcher}
        //             options={getParam?.enumParameters}
        //         />
        //     )
        // }

        if (
            fieldParam.paramType == "increment"
            || fieldParam.paramType == "decrement"
        ) {
            return (
                <>
                    <Field
                        name="paramStepValue"
                        title="Default step value"
                        placeholder="Default step value"
                        component={Input}
                    />

                    <Field
                        name="paramShiftStepValue"
                        title="[Shift] step value"
                        placeholder="Shift step value"
                        component={Input}
                    />
                </>

            )
        }

    }

    const findParam = (key) => {
        if (app.paramsData && app.paramsData.inputs) {
            let paramValue = app.paramsData?.inputs[key]

            if (paramValue) {
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

    const renderKeyboardContent = () => {
        return (
            <>
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
                        {renderLetter("A")}
                        {renderLetter("S")}
                        {renderLetter("D")}
                        {renderLetter("F")}
                        {renderLetter("G")}
                        {renderLetter("H")}
                        {renderLetter("J")}
                        {renderLetter("K")}
                        {renderLetter("L")}
                    </div>
                    <div className="keyboard-row row-3">

                        {renderLetter("Z")}
                        {renderLetter("X")}
                        {renderLetter("C")}
                        {renderLetter("V")}
                        {renderLetter("B")}
                        {renderLetter("N")}
                        {renderLetter("M")}

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
                                            name="paramType"
                                            title="Param type"
                                            component={Select}
                                            options={[{
                                                value: "setValue",
                                                label: "Set value"
                                            }, {
                                                value: "nextSwitch",
                                                label: "Next Switch"
                                            }, {
                                                value: "prevSwitch",
                                                label: "Prev Switch"
                                            }, {
                                                value: "increment",
                                                label: "Increment"
                                            }, {
                                                value: "decrement",
                                                label: "Decrement"
                                            }, {
                                                value: "hideUi",
                                                label: "Hide UI"
                                            },]}
                                        />


                                        {values.paramType !== "hideUi" && <Field
                                            name="param"
                                            title="Param"
                                            component={Select}
                                            options={app.paramsData?.params}
                                        />}



                                        {renderField(values, handleChange)}
                                    </div>

                                    <Button type="submit" label="Save" />

                                    <div className="reset-value-container">
                                        {values.param && <Button
                                            type="button"
                                            label="Reset value"
                                            minimal={true}
                                            onClick={() => {
                                                if (values.key) {
                                                    handleReset(values.key)
                                                }
                                            }}
                                        />}
                                    </div>


                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </>
        )
    }

    const renderVizTouchContent = () => {
        return (
            <>


                <div className="key-settings-container">
                    {/* <div className="key-header-container">
                    <div className="key-settings-header-left">
                        {activeKey}
                    </div>
                    <div className="key-settings-header-right">
                    </div>
                </div> */}

                    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ values, handleChange, handleSubmit, setFieldValue }) => {
                            useEffect(() => {
                                handleFormChange(values);
                            }, [values]);

                            return (
                                <Form>

                                    <div className="algo-touch-viz-container">
                                        <div
                                            className={classNames("touch-row", {
                                                "active": values.key == "touch-row-1"
                                            })}
                                            onClick={() => {
                                                setSelectedTouchRow(1)
                                                setFieldValue("key", "touch-row-1")
                                            }}
                                        >
                                            <div className="touch-item">-</div>
                                            <div className="touch-item">+</div>
                                        </div>

                                        <div
                                            className={classNames("touch-row", {
                                                "active": values.key == "touch-row-2"
                                            })}
                                            onClick={() => {
                                                setSelectedTouchRow(2)
                                                setFieldValue("key", "touch-row-2")
                                            }}
                                        >
                                            <div className="touch-item">-</div>
                                            <div className="touch-item">+</div>
                                        </div>

                                        <div
                                            className={classNames("touch-row", {
                                                "active": values.key == "touch-row-3"
                                            })}
                                            onClick={() => {
                                                setSelectedTouchRow(3)
                                                setFieldValue("key", "touch-row-3")
                                            }}
                                        >
                                            <div className="touch-item">-</div>
                                            <div className="touch-item">+</div>
                                        </div>

                                        <div
                                            className={classNames("touch-row", {
                                                "active": values.key == "touch-row-4"
                                            })}
                                            onClick={() => {
                                                setSelectedTouchRow(4)
                                                setFieldValue("key", "touch-row-4")
                                            }}
                                        >
                                            <div className="touch-item">-</div>
                                            <div className="touch-item">+</div>
                                        </div>
                                    </div>
                                    <div className="form-fields">
                                        <Field
                                            name="key"
                                            component={Select}
                                            title="Key"
                                            options={[
                                                {
                                                    value: "touch-row-1",
                                                    label: "Touch row 1"
                                                },
                                                {
                                                    value: "touch-row-2",
                                                    label: "Touch row 2"
                                                },
                                                {
                                                    value: "touch-row-3",
                                                    label: "Touch row 3"
                                                },
                                                {
                                                    value: "touch-row-4",
                                                    label: "Touch row 4"
                                                },
                                            ]}
                                        />

                                        <Field
                                            name="param"
                                            title="Param"
                                            component={Select}
                                            options={app.paramsData?.params}
                                        />

                                        <Field
                                            name="paramStepValue"
                                            title="Default step value"
                                            placeholder="Default step value"
                                            component={Input}
                                        />

                                    </div>

                                    <Button type="submit" label="Save" />

                                    <div className="reset-value-container">
                                        {values.param && <Button
                                            type="button"
                                            label="Reset value"
                                            minimal={true}
                                            onClick={() => {
                                                if (values.key) {
                                                    handleReset(values.key)
                                                }
                                            }}
                                        />}
                                    </div>


                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </>
        )
    }

    return (
        <div className="algo-inputs-container">

            <div className="algo-inputs-sections">
                <TabBar
                    tabs={[
                        "Keyboard",
                        "Viz touch",
                        "Audio"
                    ]}
                    activeTab={selectedSection}
                    onTabChange={(tab) => setSelectedSection(tab)}
                />
            </div>

            {selectedSection == 1 && renderKeyboardContent()}

            {selectedSection == 2 && renderVizTouchContent()}


        </div>
    );
}

export default AppSettings;
