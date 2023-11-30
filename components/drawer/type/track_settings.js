import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from 'formik';
import Input from "../../../components/form/BladeInput";
import Button from "../../../components/button";
import TabSwitcher from "../../../components/form/TabSwitcher"
import Select from "../../../components/form/Select";

import {
    Switch,
} from "@blueprintjs/core";;

import { trackUpdateItem, updateCollectionItem, trackUpdateManyItems, toggleDrawer, togglePlayer, toggleModal, albumSearch } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [localOptions, setLocalOptions] = useState([]);

    const handleFormChange = (values) => {
        console.log(values);
        // dispatch(testListChangeCriteria(values))
    };

    const handleSubmit = (values) => {
        console.log(values);

        dispatch(trackUpdateItem({
            data: values,
            callback: (data) => {
                dispatch(updateCollectionItem(data._id))

                dispatch(toggleDrawer({
                    drawerOpen: false,
                    drawerType: null,
                    drawerData: null,
                }))
            }
        }))
    };

    let initialValues = app.drawerData

    useEffect(() => {
        loadInitialOptions();
    
        return () => {};
      }, []);
    
    
      const loadInitialOptions = () => {
        dispatch(
          albumSearch({
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
              setLocalOptions(finalOptinos);
            },
          })
        );
      };

    const statusOptions = [, {
        label: 'Active',
        value: 'active',
    }, {
            label: 'Inactive',
            value: 'inactive',
        }]

    const handleDefaultChange = (event) => {

        let value = event.target.checked

        dispatch(trackUpdateManyItems({
            newCriteria: {
                default: false
            },
            callback: (data) => {

                dispatch(trackUpdateItem({
                    data: {
                        ...app.drawerData,
                        default: value
                    },
                    callback: (data) => {
                        dispatch(updateCollectionItem(app.drawerData._id))
                        dispatch(toggleDrawer({
                            drawerOpen: true,
                            drawerType: "track-settings",
                            drawerData: data,
                        }))
                    }
                })

                )


            }
        }))
    }

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container"}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
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
                                        name="_id"
                                        component={Input}
                                        title="Track ID"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="name"
                                        component={Input}
                                        title="Name"
                                        placeholder="Name"
                                    />

                                    <Field
                                        name="songLink"
                                        component={Input}
                                        title="Song Link"
                                        placeholder="Song Link"
                                    />

                                    <Field
                                        name="album._id"
                                        title="Album"
                                        apiUrl="/album/search"
                                        useAsync={true}
                                        component={Select}
                                        options={localOptions}
                                    />

                                    <Field
                                        name="status"
                                        title="Status"
                                        component={TabSwitcher}
                                        options={statusOptions}
                                    />

                                </div>

                                <Button
                                    type="submit"
                                    label="Save"
                                />

                                {/* <div className="form-divider"></div>

                                <Button
                                    type="button"
                                    minimal={true}
                                    label="Update all"
                                    onClick={() => {
                                        dispatch(toggleModal({
                                            modalOpen: true,
                                            modalType: "update-all",
                                            modalData: values,
                                        }))
                                    }}
                                /> */}

                            </Form>
                        )
                    }}
                </Formik>



            </div>
        </div>
    );
}

export default AppSettings;
