import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/form/BladeInput";
import Button from "@/components/button";
import Select from "@/components/form/Select";
import TabSwitcher from "@/components/form/TabSwitcher";

import { OverlayToaster } from '@blueprintjs/core';

import { generatorCreate, generatorSearch } from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const toasterRef = useRef(null)
    const dispatch = useDispatch();
    const [generators, setGenerators] = useState([]);
    const [timeStamp, setTimestamp] = useState(Date.now());


    useEffect(() => {

        searchGenerators()

        return () => {

        };
    }, []);

    const searchGenerators = () => {
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
                                iterationDelay: 0,
                                list: [
                                    {
                                        paramName: "frequency",
                                        paramType: "forward",
                                        paramIncrement: 0.0001
                                    }
                                ]
                            },
                            callback: (data) => {
                                toasterRef.current.show({ message: `${data.name} was created` });
                                //   dispatch(updateCollection(true))
                                searchGenerators()
                            }
                        },)
                )

                break;
            case "edit":
                console.log("edit")
                // dispatch(toggleDrawer({
                //     drawerOpen: open,
                //     drawerType: "album-settings",
                //     drawerData: item,
                // }));
                break;
            case "edit":
                console.log("edit")
                // dispatch(toggleDrawer({
                //     drawerOpen: open,
                //     drawerType: "album-settings",
                //     drawerData: item,
                // }));
                break;
            case "delete":
                console.log("delete")

                // dispatch(
                //     albumDelete(
                //         {
                //             albumId: item._id,
                //             callback: (data) => {
                //                 dispatch(updateCollectionItem(item._id))

                //                 router.push({
                //                     pathname: router.pathname,
                //                     query: { ...router.query, tab: 2, albumId: null }
                //                 }, undefined, { shallow: true });

                //             }
                //         },)
                // )
                break
            case "duplicate":
                console.log("duplicate")
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

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
      };
    
    const handleSubmit = (values) => {
        console.log(values);

    
    };

    let initialValues = {};
    

    const renderSwitcher = () => {
        return(<Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            useEffect(() => {
              handleFormChange(values);
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
                                            label: "Edit",
                                            value: "edit",
                                            icon: "edit"
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

                <OverlayToaster ref={toasterRef} />

                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default AppSettings;
