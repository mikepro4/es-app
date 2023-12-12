import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "../../../components/form/BladeInput";
import Button from "../../../components/button";
import Select from "../../../components/form/Select";
import Switch from "../../../components/form/Switch";
import TabSwitcher from "../../../components/form/TabSwitcher";

import {
  shapeUpdateItem,
  algoSearch,
  trackSearch,
  updateCollectionItem,
  toggleDrawer,
  togglePlayer,
  toggleModal,
  tierSearch
} from "@/redux";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();
  const [localOptions, setLocalOptions] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [tiers, setTiers] = useState([]);

  const handleFormChange = (values) => {
    console.log(values);
    // dispatch(testListChangeCriteria(values))
  };

  const handleSubmit = (values) => {
    console.log(values);

    let newValues = {
      ...values,
      origin: app.drawerData.origin?._id,
    }

    dispatch(
      shapeUpdateItem({
        data: newValues,
        callback: (data) => {
          dispatch(updateCollectionItem(data._id));

          dispatch(
            toggleDrawer({
              drawerOpen: false,
              drawerType: null,
              drawerData: null,
            })
          );
        },
      })
    );
  };

  let initialValues =  {
    ...app.drawerData ,
    tiers: app.drawerData?.tiers?.map((tier) => {
      return {
        tier: tier.tier._id,
        tierLetter: tier.tierLetter
      }
    })
  };

  // let initialValues = {
  //     _id: app.drawerData._id,
  //     name: app.drawerData.name,
  //     algo: {value: "65639da4ca12be4343efa738", label: "Ethereal"}
  // }

  useEffect(() => {
    loadInitialOptions();
    loadInitialTracks();
    loadInitialTiers()

    return () => {};
  }, []);

  const statusOptions = [
    ,
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
    {
      label: "Potential",
      value: "potential",
    },
  ];

  const loadInitialOptions = () => {
    dispatch(
      algoSearch({
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

  const loadInitialTracks = () => {
    dispatch(
      trackSearch({
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
          setTracks(finalOptinos);
        },
      })
    );
  };

  const loadInitialTiers = () => {
    dispatch(
      tierSearch({
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
          setTiers(finalOptinos);
        },
      })
    );
  };


  return (
    <div className={`app-drawer-content-container standard-drawer`}>
      <div className={"details-container"}>
        {app.drawerData?.origin?.name && (<div>From: {app.drawerData?.origin?.name}</div>)}

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            useEffect(() => {
              handleFormChange(values);
            }, [values]);

            return (
              <Form>
                <div className="form-fields">
                  <Field
                    name="_id"
                    component={Input}
                    title="Shape ID"
                    placeholder="Name"
                  />

                  <Field
                    name="name"
                    component={Input}
                    title="Name"
                    placeholder="Name"
                  />

                  <Field
                    name="algo"
                    title="Algorithm"
                    apiUrl="/algo/search"
                    useAsync={true}
                    component={Select}
                    options={localOptions}
                  />

                  <Field
                    name="track"
                    title="Track"
                    apiUrl="/track/search"
                    useAsync={true}
                    component={Select}
                    options={tracks}
                  />

                  <Field
                    name="imageLink"
                    component={Input}
                    title="Image Link"
                    placeholder="Image Link"
                  />

                  <Field
                    name="status"
                    title="Status"
                    component={TabSwitcher}
                    options={statusOptions}
                  />

                  <FieldArray
                    name="tiers"
                    render={arrayHelpers => (
                      <div className="generator-params-container">
                        <div className="generator-params-header">
                            Tiers
                        </div>
                        {values.tiers?.map((tier, index) => (
                          <div className="generator-param-container" key={index}>
                            <div className="generator-param-container-header">
                                <div className="generator-param-container-header-left">
                                    Variant {index + 1}
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
                              name={`tiers[${index}].tier`}
                              component={Select}
                              options={tiers} // You need to define tierOptions
                              title="Tier"
                            />
                            <Field
                              name={`tiers[${index}].tierLetter`}
                              component={Input}
                              title="Tier Letter"
                              placeholder="Tier Letter"
                            />
            
                          </div>
                        ))}

                        <div className="generator-params-footer">
                          <Button
                              type="button"
                              icon="plus"
                              small={true}
                              minimal={true}
                              label="Add parameter"
                              onClick={() => arrayHelpers.push({
                                tier: '', tierLetter: ''
                              })}>
                          </Button>
                        </div>
                      </div>
                    )}
                  />

                  <Field
                    name="genesis"
                    component={Switch}
                    label="Genesis"
                  />

                  <Field
                    name="iteration"
                    component={Switch}
                    label="Iteration"
                  />

                  <Field
                    name="inCollection"
                    component={Switch}
                    label="In Collection"
                  />
                </div>
                

                <Button type="submit" label="Save" />

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
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AppSettings;
