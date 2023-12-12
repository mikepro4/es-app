import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Slider from "@/components/form/Slider";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import Switch from "@/components/form/Switch";
import TabSwitcher from "@/components/form/TabSwitcher";

import { OverlayToaster } from '@blueprintjs/core';

import {
    generatorCreate,
    generatorSearch,
    generatorItem,
    generatorUpdateItem,
    generatorDelete,
    generatorDuplicate,
    updateCollection
} from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const appData = useSelector((state) => state.appData);
    const router = useRouter();
    const toasterRef = useRef(null)
    const dispatch = useDispatch();
    const [generators, setGenerators] = useState([]);
    const [timeStamp, setTimestamp] = useState(Date.now());
    const [generator, setGenerator] = useState(null);
    const [activeGenerator, setActiveGenerator] = useState({});


    useEffect(() => {

        searchGenerators(true)

        return () => {

        };
    }, []);

    const loadGenerator = (id) => {
        dispatch(generatorItem({
            id: id,
            callback: (data) => {
                console.log("loaded generator", data)
                setGenerator(data)

            }
        }))
    }

    const selectGenerator = (id) => {
        setActiveGenerator({ generatorId: id })
    }

    const searchGenerators = (doSelect, setSpecific) => {
        dispatch(
            generatorSearch({
                criteria: {},
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: 1,

                callback: (data) => {
                    let finalOptinos = data.all.map((option) => {
                        return {
                            value: option._id,
                            label: option.name,
                        };
                    });
                    setGenerators(finalOptinos);
                    setTimestamp(Date.now())
                    if (setSpecific) {
                        setTimeout(() => {
                            selectGenerator(setSpecific)
                        }, 100)
                    } else {
                        if (app.drawerData?.activeItem) {
                            selectGenerator(app.drawerData.activeItem)
                        } else {
                            if (finalOptinos[0]?.value && doSelect) {
                                setTimeout(() => {
                                    selectGenerator(finalOptinos[0].value)
                                }, 100)
                            }
                        }
                    }

                },
            })
        );
    }

    let switchAction = (value) => {
        switch (value) {
            case "new":
                console.log("create new")
                dispatch(
                    generatorCreate(
                        {
                            name: "X",
                            params: {
                                iterations: 100000,
                                iterationGap: 1,
                                list: []
                            },
                            callback: (data) => {
                                toasterRef.current.show({ message: `${data.name} was created` });
                                dispatch(updateCollection(true))
                                searchGenerators(false, data._id)
                                // setTimeout(() => {
                                //     selectGenerator(data._id)
                                // }, 100)
                            }
                        },)
                )

                break;
            case "delete":
                console.log("delete")
                if (generator && generator._id) {
                    dispatch(updateCollection(true))
                    dispatch(generatorDelete({
                        generatorId: generator._id,
                        callback: (data) => {
                            toasterRef.current.show({ message: `${generator.name} was deleted` });
                            setActiveGenerator({})
                            searchGenerators(true)
                            setGenerator(null)
                        }
                    }))
                }
                break
            case "duplicate":
                console.log("duplicate")
                if (generator && generator._id) {
                    dispatch(updateCollection(true))
                    dispatch(generatorDuplicate({
                        generatorId: generator._id,
                        callback: (data) => {
                            toasterRef.current.show({ message: `${generator.name} was duplicated` });
                            searchGenerators()
                            setTimeout(() => {
                                selectGenerator(data._id)
                            }, 100)
                        }
                    }))
                }
                // dispatch(
                //     albumDuplicate(
                //         {
                //             albumId: item._id,
                //             callback: (data) => {
                //                 dispatch(updateCollection(true))

                //                 router.push({
                //                     pathname: router.pathname,
                //                     query: { ...router.query, tab: 2, albumId: data._id }
                //                 }, undefined, { shallow: true });
                //             }
                //         },)
                // )
                break;
            default:
                break;
        }
    }

    const handleSelectorFormChange = (values) => {
        console.log(values);
        if (values && values.generatorId) {
            loadGenerator(values?.generatorId)
        }
    };

    const handleSelectorSubmit = (values) => {
        console.log(values);
    };

    let initialSelectorValues = {};


    const renderSwitcher = () => {
        return (<Formik enableReinitialize initialValues={activeGenerator} onSubmit={handleSelectorSubmit}>
            {({ values, handleChange, handleSubmit }) => {
                useEffect(() => {
                    handleSelectorFormChange(values);
                }, [values]);

                return (
                    <Form
                        enableReinitialize={true}
                        key={timeStamp}
                    >

                        <Field
                            name="generatorId"
                            apiUrl="/generator/search"
                            useAsync={true}
                            component={Select}
                            options={generators}
                        />

                    </Form>
                );
            }}
        </Formik>)
    }

    const handleGeneratorSubmit = (values) => {
        console.log(values);
        dispatch(generatorUpdateItem({
            data: values,
            callback: (data) => {
                dispatch(updateCollection(true))
                searchGenerators()
                toasterRef.current.show({ message: `${data.name} was updated` });
            }
        }))
        // loadGenerator(values.generatorId)
    };

    const handleGenerationsFormChange = (values) => {
        console.log(values);
    };

    // const getParamsList = () => {
    //     const paramsList = app.drawerData.params
    //     const newParamsList = paramsList.map((param) => {
    //         return {
    //             value: param.,
    //             paramType: param.paramType,
    //             paramIncrement: param.paramIncrement
    //         }
    //     }
    // }

    const getParam = (value) => {
        const algo = appData.algos.find((item) => item._id === app.playerData.algo)
        const param = algo.params.find(param => param.value === value)

        return param
    }

    const renderGeneratorParams = () => {
        const algo = appData.algos.find((item) => item._id === app.playerData.algo)
        return (
            <div className="generator-params">

                <Formik
                    enableReinitialize
                    initialValues={generator}
                    onSubmit={handleGeneratorSubmit}
                >
                    {({ values, handleChange, handleSubmit }) => {
                        useEffect(() => {
                            handleGenerationsFormChange(values);
                        }, [values]);
                        return (
                            <Form>
                                <Field
                                    name="name"
                                    component={Input}
                                    title="Name"
                                    placeholder="Name"
                                />

                                <div className="form-split">

                                    <Field
                                        name="params.iterations"
                                        component={Input}
                                        title="Iterations"
                                        placeholder="Iterations"
                                    />


                                    <Field
                                        name="params.iterationGap"
                                        component={Input}
                                        title="Iteration Gap"
                                        placeholder="Iteration Gap"
                                    />

                                </div>




                                <FieldArray
                                    name="params.list"
                                    render={arrayHelpers => (
                                        <div className="generator-params-container">
                                            <div className="generator-params-header">
                                                Parameters
                                            </div>
                                            {values.params?.list && values.params.list.length > 0 ? (
                                                values.params.list.map((listItem, index) => (
                                                    <div className="generator-param-container" key={index}>
                                                        <div className="generator-param-container-header">
                                                            <div className="generator-param-container-header-left">
                                                                Parameter {index + 1}
                                                            </div>

                                                            <div className="generator-param-container-header-right">
                                                                <Button
                                                                    type="button"
                                                                    icon="trash"
                                                                    small={true}
                                                                    minimal={true}
                                                                    onClick={() => arrayHelpers.remove(index)} // remove a list item
                                                                />
                                                            </div>
                                                        </div>

                                                        <Field
                                                            name={`params.list.${index}.paramName`}
                                                            title="Param name"
                                                            options={algo.params}
                                                            component={Select}
                                                            searchable={false}
                                                        />

                                                        <Field
                                                            name={`params.list.${index}.delayIterations`}
                                                            component={Input}
                                                            title="Delay Iterations"
                                                            placeholder="Delay Iterations"
                                                        />

                                                        <Field
                                                            component={Slider}
                                                            name={`params.list.${index}.delayIterations`}
                                                            min={0}
                                                            max={100000}
                                                            step={1}
                                                            labelStepSize={100000 / 3}
                                                            displayName={"Delay Iterations"}
                                                        />

                                                        <Field
                                                            name={`params.list.${index}.paramType`}
                                                            title="Param type"
                                                            component={TabSwitcher}
                                                            options={[{
                                                                value: "step",
                                                                label: "Step"
                                                            },
                                                            {
                                                                value: "range",
                                                                label: "Range"
                                                            },
                                                            {
                                                                value: "random",
                                                                label: "Random"
                                                            }
                                                            ]} />
                                                        {getParam(listItem.paramName)?.type === 'number' && (
                                                            <>

                                                                {listItem.paramType === 'step' && (
                                                                    <>
                                                                        <Field
                                                                            name={`params.list.${index}.stepAmount`}
                                                                            component={Input}
                                                                            title="Step amount"
                                                                            placeholder="Step amount"
                                                                        />

                                                                        <Field
                                                                            name={`params.list.${index}.stepDirection`}
                                                                            title="Step direction"
                                                                            component={TabSwitcher}
                                                                            options={[{
                                                                                value: "forward",
                                                                                label: "Foward"
                                                                            },
                                                                            {
                                                                                value: "backward",
                                                                                label: "Backward"
                                                                            }
                                                                            ]} />
                                                                    </>
                                                                )}

                                                                {listItem.paramType === 'range' && (
                                                                    <>
                                                                        <Field
                                                                            name={`params.list.${index}.fromAmount`}
                                                                            component={Input}
                                                                            title="From amount"
                                                                            placeholder="From amount"
                                                                        />

                                                                        <Field
                                                                            name={`params.list.${index}.toAmount`}
                                                                            component={Input}
                                                                            title="To amount"
                                                                            placeholder="To amount"
                                                                        />

                                                                        <Field
                                                                            name={`params.list.${index}.rangeIterations`}
                                                                            component={Input}
                                                                            title="Range Iterations"
                                                                            placeholder="Range Iterations"
                                                                        />

                                                                        <Field
                                                                            component={Slider}
                                                                            name={`params.list.${index}.rangeIterations`}
                                                                            min={0}
                                                                            max={100000}
                                                                            step={1}
                                                                            labelStepSize={100000 / 3}
                                                                            displayName={"Range Iterations"}
                                                                        />

                                                                        <Field
                                                                            name={`params.list.${index}.rangeBehavior`}
                                                                            title="Range behavior"
                                                                            component={TabSwitcher}
                                                                            options={[{
                                                                                value: "single",
                                                                                label: "Single"
                                                                            },
                                                                            {
                                                                                value: "loop",
                                                                                label: "Loop"
                                                                            },
                                                                            {
                                                                                value: "bounce",
                                                                                label: "Bounce"
                                                                            }
                                                                            ]} />

                                                                    </>
                                                                )}

                                                                {listItem.paramType === 'random' && (
                                                                    <>
                                                                        <Field
                                                                            name={`params.list.${index}.fromAmount`}
                                                                            component={Input}
                                                                            title="From amount"
                                                                            placeholder="From amount"
                                                                        />

                                                                        <Field
                                                                            name={`params.list.${index}.toAmount`}
                                                                            component={Input}
                                                                            title="To amount"
                                                                            placeholder="To amount"
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}




                                                        {/* <Field
                                                            name={`params.list.${index}.paramType`}
                                                            component={Input}
                                                            title="Parameter Type"
                                                            placeholder="Parameter Type"
                                                        /> */}
                                                        {/* <Field
                                                            name={`params.list.${index}.paramIncrement`}
                                                            component={Input}
                                                            title="Parameter Increment"
                                                            placeholder="Parameter Increment"
                                                        /> */}

                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                            <div className="generator-params-footer">
                                                <Button
                                                    type="button"
                                                    icon="plus"
                                                    small={true}
                                                    minimal={true}
                                                    label="Add parameter"
                                                    onClick={() => arrayHelpers.push({
                                                        paramName: '',
                                                        paramType: "step",
                                                        delayIterations: 1,
                                                        rangeIterations: 0
                                                    })}>
                                                </Button>
                                            </div>

                                        </div>
                                    )}
                                />

                                <Field
                                    name="params.changeColor"
                                    label="Change Color"
                                    component={Switch}
                                />

                                <Button type="submit" label="Submit">Submit</Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        )
    }


    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container generator-drawer-container "}>
                <div className="generator-header">
                    <div className="generator-header-left">
                        {renderSwitcher()}
                    </div>

                    <div className="generator-header-right">
                        <ParamSwitch
                            type="local-icon"
                            icon="more-vertical"
                            value=""
                            position="bottom right"
                            offset={[10, 0]}
                            params={[
                                {
                                    type: "links",
                                    values: [
                                        {
                                            label: "Create new",
                                            value: "new",
                                            icon: "plus"
                                        },
                                        {
                                            label: "Duplicate",
                                            value: "duplicate",
                                            icon: "duplicate"
                                        },
                                    ],
                                },
                                {
                                    type: "divider",

                                },
                                {
                                    type: "links",
                                    values: [
                                        {
                                            label: "Delete",
                                            value: "delete",
                                            icon: "trash"
                                        },
                                    ],
                                }
                            ]}
                            onChange={(value) => {
                                switchAction(value)
                                // alert(value)
                            }}
                        />
                    </div>
                </div>

                {generator && generator._id && renderGeneratorParams()}

                <OverlayToaster ref={toasterRef} />

                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default AppSettings;
