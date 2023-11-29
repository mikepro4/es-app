import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "@/components/form/BladeInput";
import Select from "@/components/form/Select";
import SwitchField from "@/components/form/Switch";
import ColorPicker from "@/components/form/ColorPicker";
import TabSwitcher from "@/components/form/TabSwitcher";
import Button from "@/components/button";
import Icon from "@/components/icon";
import AlgoPreview from "./algoPreview";



import TabBar from '@/components/tab'
import { v4 as uuidv4 } from 'uuid';

import AlgoActionsView from "@/components/collection_actions/algoActions";

import { algoUpdateItem, updateCollectionItem, algoItem, algoUpdateManyItems, toggleParamsData } from "@/redux";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    OverlayToaster,
} from "@blueprintjs/core";
import { set } from "lodash";

function AlgoPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef(null)
    const [selectedTypes, setSelectedTypes] = useState({});
    const [selectedTabId, setSelectedTabId] = useState(2);
    const [selectedSectionId, setselectedSectionId] = useState(1);

    const [code, setCode] = useState(null);
    const [params, setParams] = useState(null);

    const [codeItems, setCodeItems] = useState({
        main: {
            fragment: "Main fragment",
            vertex: "Main vertex"
        },
        bufferA: {
            fragment: "Buffer A Fragment",
            vertex: "Buffer A Vertex"
        },
        bufferB: {
            fragment: "Buffer B Fragment",
            vertex: "Buffer B Vertex"
        },
        common: {
            fragment: "Common F",
            vertex: "Common V"
        }
    });

    const [selectedSection, setSelectedSection] = useState(1);
    const [selectedShader, setSelectedShader] = useState("fragment");

    // const [mainFragCode, setMainFragCode] = useState(null);


    const formikRef = useRef(null);

    const monaco = useMonaco();

    let tabs = [
        "Properties",
        "Code",
        "Preview",
    ]

    let tabsAlgo = [
        "Properties",
        "Code"
    ]

    let tabsSections = [
        "Main image",
        "Buffer A",
        "Buffer B",
        "Common"
    ]

    const submitFormFromOutside = () => {
        if (formikRef.current) {
            formikRef.current.submitForm();
        }
    };

    const selectSection = (section) => {
        setSelectedSection(section)
    }


    const selectTab = (tab) => {
        setSelectedTabId(tab)

        if (tab == 2) {
            fetch('/theme.json') // You need to have the theme JSON
                .then(data => data.json())
                .then(theme => {
                    monaco.editor.defineTheme('vs-dark', theme);
                    monaco.editor.setTheme('vs-dark');
                });
        }
    }

    useEffect(() => {
        if (monaco) {
            fetch('/theme.json') // You need to have the theme JSON
                .then(data => data.json())
                .then(theme => {
                    monaco.editor.defineTheme('vs-dark', theme);
                    monaco.editor.setTheme('vs-dark');
                });
        }

    }, [monaco]);


    const [algo, setAlgo] = useState(false);

    const fetchAlgo = () => {
        dispatch(algoItem({
            id: router.query.algoId,
            callback: (data) => {
                console.log(data);
                setAlgo(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                setCodeItems(data.code)
            }
        }))
    }

    useEffect(() => {
        fetchAlgo()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == algo?._id) {
            fetchAlgo()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.algoId && algo?._id && router.query.algoId !== algo?._id) {
            fetchAlgo()
        }
    }, [router]);

    const saveCodeAndParams = () => {
        dispatch(algoUpdateItem({
            data: {
                ...algo,
                ...params,
                code: codeItems
            },
            callback: (data) => {
                console.log(data);
                setAlgo(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                toasterRef.current.show({ message: "Algo updated" });
            }
        }))
    }

    const typeOptions = [
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Array', value: 'array' },
        { label: 'Color', value: 'color' },
    ]

    const arrayValueOptions = [
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Color', value: 'color' },
    ]

    const tabOptions = [{
        label: 'Tab',
        value: 'tab',
    }, {
        label: 'Dropdown',
        value: 'dropdown',
    }];

    const tabNumberOptions = [{
        label: 'Text input',
        value: 'input',
    }, {
        label: 'Slider',
        value: 'slider',
    }];


    const renderAlgo = () => {
        if (algo && algo._id) {
            return (
                <div className="algo-page-header">
                    <div className="algo-page-header-left">
                        <h1>{algo.name}</h1>
                    </div>

                    <div className="algo-page-header-right">
                        <ul className="algo-save-button">
                            <li>
                                <Button
                                    label="Compile"
                                    icon="play"
                                    small={true}
                                    wrap={true}
                                    minimal={true}
                                    onClick={() => {

                                    }}
                                />
                            </li>

                            <li>
                                <Button
                                    label="Save"
                                    icon="floppy-disk"
                                    small={true}
                                    wrap={true}
                                    minimal={true}
                                    onClick={() => {
                                        saveCodeAndParams()
                                    }}
                                />
                            </li>
                        </ul>

                        <AlgoActionsView
                            item={algo}
                        />
                    </div>

                    <div className="algo-page-content-header-desktop-tab">
                        <TabBar
                            tabs={tabsAlgo}
                            activeTab={selectedTabId}
                            onTabChange={(tab) => selectTab(tab)}
                        />
                    </div>

                </div>
            )
        }
    }

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
        dispatch(toggleParamsData(values))
        setParams(values)
    };

    const handleSubmit = (values) => {

        dispatch(algoUpdateItem({
            data: {
                ...algo,
                ...values
            },
            callback: (data) => {
                dispatch(updateCollectionItem(data._id))
                toasterRef.current.show({ message: "Algo updated" });

                dispatch(toggleDrawer({
                    drawerOpen: false,
                    drawerType: null,
                    drawerData: null,
                }))
            }
        }))
    };

    let initialValues = {
        slug: algo?.slug,
        params: algo?.params || [],
    }

    const addParameterToParam = (setFieldValue, values) => {
        // Create a new parameter object
        const newParameter = {
            value: `param-${values.params.length + 1}`,
            label: `Parameter ${values.params.length + 1}`,
            id: uuidv4()
        };

        // Copy the current params and add the new parameter to the specified param
        const newParams = [...values.params];
        newParams.push(newParameter);

        // Update Formik values
        setFieldValue('params', newParams);
    };

    const removeParameterFromParam = (index, setFieldValue, values) => {
        // Create a new array excluding the param at the given index
        const newParams = values.params.filter((_, paramIndex) => paramIndex !== index);

        // Update Formik values
        setFieldValue('params', newParams);
    };


    const addArrayValueToParam = (index, setFieldValue, values) => {
        // Generate a new ID for the array item
        const newItemId = uuidv4();

        // Create a new array item object
        const newArrayItem = {
            id: newItemId,
            value: "",
            label: ""
        };

        // Copy the current arrayParameters and add the new item
        const newArrayParameters = [...(values.params[index].arrayParameters || []), newArrayItem];

        // Update Formik values for arrayParameters
        setFieldValue(`params[${index}].arrayParameters`, newArrayParameters);
    };

    const addEnumValueToParam = (index, setFieldValue, values, type, originalArrayIndex) => {
        if (type == "main") {
            // Generate a new ID for the array item
            const newItemId = uuidv4();

            // Create a new array item object
            const newArrayItem = {
                id: newItemId,
                value: "",
                label: ""
            };

            // Copy the current arrayParameters and add the new item
            const newArrayParameters = [...(values.params[index].arrayParameters || []), newArrayItem];

            // Update Formik values for arrayParameters
            setFieldValue(`params[${index}].enumParameters`, newArrayParameters);
        }
    };


    const renderField = (type, name, title) => {
        switch (type) {
            case "string":
                return (
                    <Field
                        name={name}
                        component={Input}
                        title={title}
                        placeholder={title}
                    />
                )
            case "number":
                return (
                    <Field
                        name={name}
                        component={Input}
                        title={title}
                        placeholder={title}
                    />
                )
            case "boolean":
                return (
                    <Field
                        name={name}
                        component={SwitchField}
                        label={title}
                    />
                )
            case "boolean":
                return (
                    <Field
                        name={name}
                        component={SwitchField}
                        label={title}
                    />
                )
            case "color":
                return (
                    <Field
                        name={name}
                        component={ColorPicker}
                    />
                )
            default:
                return;
        }
    }

    const renderArrayParameters = (param, index, values) => {
        return (
            <div className="param-type-array-container">

                <div className="param-type-array-container-header">
                    Array parameters
                </div>

                <FieldArray
                    name={`params[${index}].arrayParameters`}
                    render={arrayHelpers => (
                        <div className="array-params-container">
                            {param.arrayParameters && param.arrayParameters.length > 0 && (
                                param.arrayParameters.map((arrayParam, arrayIndex) => (
                                    <div
                                        key={arrayParam.id}
                                        className="array-single-parameter"
                                    >

                                        <div className="array-single-parameter-header">
                                            <div className="array-single-parameter-header-right">
                                                Array parameter {arrayIndex + 1}
                                            </div>

                                            <div className="array-single-parameter-header-left">
                                                <Button
                                                    type="button"
                                                    icon="trash"
                                                    small={true}
                                                    minimal={true}
                                                    onClick={() => arrayHelpers.remove(arrayIndex)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>


                                        <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].type`}
                                            title="Array parameter value type"
                                            options={arrayValueOptions}
                                            component={Select}
                                            searchable={false}
                                        />



                                        <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].value`}
                                            component={Input}
                                            title={`Array parameter value`}
                                            placeholder={`Array parameter value`}
                                        />

                                        <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].label`}
                                            component={Input}
                                            title={`Array parameter label`}
                                            placeholder={`Array parameter label`}
                                        />


                                        {values.params[index].arrayParameters[arrayIndex].type == "number" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].defaultValue`,
                                            `Default value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == "number" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].minValue`,
                                            `Min value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == "number" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].maxValue`,
                                            `Max value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == "number" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].stepValue`,
                                            `Step value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == "string" && renderEnumParameters(param, index, values, "secondary", arrayIndex)}

                                        {values.params[index].arrayParameters[arrayIndex].type == 'string' && <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].view`}
                                            title="View type"
                                            component={TabSwitcher}
                                            options={tabOptions}
                                        />}

                                        {values.params[index].arrayParameters[arrayIndex].type === 'string' && <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].defaultValue`}
                                            title="Default Value"
                                            options={values.params[index].arrayParameters[arrayIndex].enumParameters}
                                            component={Select}
                                            searchable={false}
                                        />}


                                        {values.params[index].arrayParameters[arrayIndex].type == "color" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].defaultValue`,
                                            `Default value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == "boolean" && renderField(
                                            values.params[index].arrayParameters[arrayIndex].type,
                                            `params[${index}].arrayParameters[${arrayIndex}].defaultValue`,
                                            `Default value`
                                        )}

                                        {values.params[index].arrayParameters[arrayIndex].type == 'number' && <Field
                                            name={`params[${index}].arrayParameters[${arrayIndex}].view`}
                                            title="View type"
                                            component={TabSwitcher}
                                            options={tabNumberOptions}
                                        />}

                                    </div>
                                ))
                            )}
                            <Button
                                type="button"
                                icon="plus"
                                label="Add array value"
                                small={true}
                                minimal={true}
                                onClick={() => addArrayValueToParam(index, arrayHelpers.push, values)}
                            />
                        </div>
                    )}
                />
            </div>
        )
    }

    const renderEnumParameters = (param, index, values, type, originalArrayIndex) => {

        const getValueName = (index, arrayIndex) => {
            let valueName

            if (type == "main") {
                valueName = `params[${index}].enumParameters[${arrayIndex}].value`
            }

            if (type == "secondary") {
                valueName = `params[${index}].arrayParameters[${originalArrayIndex}].enumParameters[${arrayIndex}].value`
            }

            return valueName
        }

        const getLabelName = (index, arrayIndex) => {
            let labelName

            if (type == "main") {
                labelName = `params[${index}].enumParameters[${arrayIndex}].label`
            }

            if (type == "secondary") {
                labelName = `params[${index}].arrayParameters[${originalArrayIndex}].enumParameters[${arrayIndex}].label`
            }


            return labelName
        }

        return (
            <div className="param-type-array-container">

                <div className="param-type-array-container-header">
                    Enum parameters
                </div>

                <FieldArray
                    name={`params[${index}].enumParameters`}
                    render={arrayHelpers => (
                        <div className="array-params-container">
                            {param.enumParameters && param.enumParameters.length > 0 && (
                                param.enumParameters.map((arrayParam, arrayIndex) => (
                                    <div
                                        key={arrayParam.id}
                                        className="array-single-parameter"
                                    >

                                        <div className="array-single-parameter-header">
                                            <div className="array-single-parameter-header-right">
                                                Enum parameter {arrayIndex + 1}
                                            </div>

                                            <div className="array-single-parameter-header-left">
                                                <Button
                                                    type="button"
                                                    icon="trash"
                                                    small={true}
                                                    minimal={true}
                                                    onClick={() => arrayHelpers.remove(arrayIndex)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>


                                        <Field
                                            name={getValueName(index, arrayIndex)}
                                            component={Input}
                                            title={`Value`}
                                            placeholder={`Value`}
                                        />

                                        <Field
                                            name={getLabelName(index, arrayIndex)}
                                            component={Input}
                                            title={`Label`}
                                            placeholder={`Label`}
                                        />

                                    </div>
                                ))
                            )}
                            <Button
                                type="button"
                                icon="plus"
                                label="Add enum value"
                                small={true}
                                minimal={true}
                                onClick={() => addEnumValueToParam(index, arrayHelpers.push, values, "main", originalArrayIndex)}
                            />
                        </div>
                    )}
                />
            </div>
        )
    }

    const renderForm = () => {
        return (
            <div className="algo-form">
                {algo && algo._id && <Formik
                    innerRef={formikRef}
                    enableReinitialize={true}
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

                                    <Field
                                        name="slug"
                                        component={Input}
                                        title="Slug"
                                        placeholder="Slug"
                                    />

                                    <DragDropContext
                                        onDragEnd={result => {
                                            const { source, destination } = result;

                                            // Check if param is dropped outside the list
                                            if (!destination) {
                                                return;
                                            }

                                            const newParams = Array.from(values.params);
                                            const [removed] = newParams.splice(source.index, 1);
                                            newParams.splice(destination.index, 0, removed);

                                            setFieldValue('params', newParams);
                                        }}
                                    >
                                        <Droppable droppableId="droppable">
                                            {(provided) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="params-container"
                                                >
                                                    <div className="params-container-header">
                                                        Params
                                                    </div>

                                                    {values.params.map((param, index) => (
                                                        <Draggable key={param.id} draggableId={param.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}

                                                                    className="form-fields-draggable"
                                                                >

                                                                    <div
                                                                        className="draggable-field-header"
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <div className="draggable-field-header-left">
                                                                            Param {index + 1}
                                                                        </div>


                                                                        <div className="draggable-field-header-left">
                                                                            <Button
                                                                                type="button"
                                                                                icon="trash"
                                                                                small={true}
                                                                                minimal={true}
                                                                                onClick={() => removeParameterFromParam(index, setFieldValue, values)}
                                                                            >
                                                                            </Button>
                                                                        </div>
                                                                    </div>

                                                                    <Field
                                                                        name={`params[${index}].value`}
                                                                        component={Input}
                                                                        title={`Value`}
                                                                        placeholder={`Value`}
                                                                    />


                                                                    <Field
                                                                        name={`params[${index}].label`}
                                                                        component={Input}
                                                                        title={`Label`}
                                                                        placeholder={`Label`}
                                                                    />

                                                                    <Field
                                                                        name={`params[${index}].type`}
                                                                        title="Type"
                                                                        options={typeOptions}
                                                                        component={Select}
                                                                        searchable={false}
                                                                    />


                                                                    {values.params[index].type === 'array' && renderArrayParameters(param, index, values)}

                                                                    {values.params[index].type === 'string' && renderEnumParameters(param, index, values, "main", null)}
                                                                    {values.params[index].type === 'string' && <Field
                                                                        name={`params[${index}].view`}
                                                                        title="View type"
                                                                        component={TabSwitcher}
                                                                        options={tabOptions}
                                                                    />}

                                                                    {values.params[index].type === 'string' && <Field
                                                                        name={`params[${index}].defaultValue`}
                                                                        title="Default Value"
                                                                        options={values.params[index].enumParameters}
                                                                        component={Select}
                                                                        searchable={false}
                                                                    />}

                                                                    {values.params[index].type === 'number' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].defaultValue`,
                                                                        `Default value`
                                                                    )}

                                                                    {values.params[index].type === 'number' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].minValue`,
                                                                        `Min value`
                                                                    )}

                                                                    {values.params[index].type === 'number' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].maxValue`,
                                                                        `Max value`
                                                                    )}

                                                                    {values.params[index].type === 'number' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].stepValue`,
                                                                        `Step value`
                                                                    )}

                                                                    {values.params[index].type === 'number' && <Field
                                                                        name={`params[${index}].view`}
                                                                        title="View type"
                                                                        component={TabSwitcher}
                                                                        options={tabNumberOptions}
                                                                    />}

                                                                    {values.params[index].type === 'color' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].defaultValue`,
                                                                        `Default value`
                                                                    )}

                                                                    {values.params[index].type === 'boolean' && renderField(
                                                                        values.params[index].type,
                                                                        `params[${index}].defaultValue`,
                                                                        `Default value`
                                                                    )}

                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}

                                                    <Button
                                                        type="button"
                                                        label="Add parameter"
                                                        minimal={true}
                                                        icon="plus"
                                                        wrap={true}
                                                        small={true}
                                                        onClick={() => addParameterToParam(setFieldValue, values)}
                                                    >
                                                        Add Parameter
                                                    </Button>
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>

                                </div>

                                <Button
                                    type="submit"
                                    small={true}
                                    label="Save"
                                    wrap={true}
                                />

                            </Form>
                        )
                    }}
                </Formik>}

            </div>
        )
    }

    const renderContent = () => {
        switch (selectedTabId) {
            case 1:
                return (<>{renderForm()}</>)
            case 3:
                return (
                    <div className="params-container">
                        <AlgoPreview
                            item={algo}
                        />
                    </div>
                )
            default:
                return;
        }
    }

    const getCodeValue = () => {

        switch (selectedSection) {
            case 1:
                return codeItems.main[selectedShader]
            case 2:
                return codeItems.bufferA[selectedShader]
            case 3:
                return codeItems.bufferB[selectedShader]
            case 4:
                return codeItems.common[selectedShader]
            default:
                return;
        }
    }

    const selectDestination = () => {

        switch (selectedSection) {
            case 1:
                return "main"  
            case 2:
                return "bufferA"
            case 3:
                return "bufferB"
            case 4:
                return "common"
            default:
                return;
        }
    }

    const updateCodeItems = (newCode) => {


        
        let newItem = {
            ...codeItems,
            [selectDestination()]: {
                ...codeItems[selectDestination()],
                [selectedShader]: newCode
            }
        }

        setCodeItems(newItem)
        
    }

    return (
        <div className="algo-page-container">

            <div className="algo-page-wrapper">

                <div className="algo-page-content-header-desktop">
                    <div
                        className="algo-page-content-header-desktop-arrow-back-container"
                        onClick={() => {
                            router.push({
                                pathname: '/genesis',
                                query: { ...router.query, algoId: null },
                            }, undefined, { shallow: true })
                        }}
                    >
                        <Icon name="arrow-back" />
                    </div>
                    {renderAlgo()}


                </div>

                {selectedTabId == 2 && <div className="algo-page-code">

                    <div className="algo-code-sections">
                        <TabBar
                            tabs={tabsSections}
                            activeTab={selectedSection}
                            onTabChange={(tab) => selectSection(tab)}
                        />
                    </div>

                    <Editor
                        height="90vh"
                        defaultLanguage="wgsl"
                        defaultValue={getCodeValue()}
                        theme="space-dark"
                        value={getCodeValue()} 
                        onChange={(newCode) => updateCodeItems(newCode)} 
                    />

                    <div className="algo-code-sections">
                        shaders
                    </div>
                </div>}

                <div className="algo-page-content">
                    <div className="algo-page-content-header">
                        <Button
                            label="Back"
                            icon="arrow-left"
                            minimal={true}
                            small={true}
                            wrap={true}
                            onClick={() => {
                                router.push({
                                    pathname: '/genesis',
                                    query: { ...router.query, algoId: null },
                                }, undefined, { shallow: true })
                            }}
                        />

                        {renderAlgo()}
                    </div>






                    <div className="algo-page-content-container">


                        <div className="algo-page-content-right">
                            <div className="algo-properties-container">
                                <div className="algo-properties-container-header">
                                    <div className="algo-properties-container-left">
                                        <TabBar
                                            tabs={tabs}
                                            activeTab={selectedTabId}
                                            onTabChange={(tab) => selectTab(tab)}
                                        />
                                    </div>
                                    <div className="algo-properties-container-right">

                                    </div>
                                </div>


                                {renderContent()}

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="algo-page-content-algo-preview">

                <AlgoPreview
                    item={algo}
                />

            </div>

            <OverlayToaster ref={toasterRef} />

        </div>
    );
}

export default AlgoPageContainer;
