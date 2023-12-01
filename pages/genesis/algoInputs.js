import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import TabSwitcher from "@/components/form/TabSwitcher";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const keyboard = useSelector((state) => state.keyboard);
    const router = useRouter();
    const [activeKey, setActiveKey] = useState(false);
    const [initialValues, setInitialValues] = useState({});

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
        // dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        console.log(values);

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



    return (
        <div className="algo-inputs-container">
            <div className="keyboard-container">
                <div className="keyboard-row row-1">
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("Q"),
                        })}
                    >Q</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("W"),
                        })}
                    >W</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("E"),
                        })}
                    >E</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("R"),
                        })}
                    >R</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("T"),
                        })}
                    >T</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("Y"),
                        })}
                    >Y</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("U"),
                        })}
                    >U</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("I"),
                        })}
                    >I</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("O"),
                        })}
                    >O</div>
                    <div
                        className={classNames("keyboard-key", {
                            "keyboard-key-active": keyboard.activeKeys.includes("P"),
                        })}
                    >P</div>
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
                                        name="status"
                                        title="Status"
                                        component={Select}
                                        options={app.paramsData?.params}
                                    />
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
