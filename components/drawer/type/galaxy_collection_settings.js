import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import TabSwitcher from "../../../components/form/TabSwitcher";

import { Formik, Form, Field, FieldArray } from "formik";
import Input from "../../../components/form/BladeInput";

import { toggleDrawer } from "@/redux";
import Button from "@/components/button";
import _ from "lodash";

import { useFormik } from "formik";

import {
  updateCollection,
  galaxyListChangeCriteria,
  galaxyResetCriteria,
  galaxyCreate,
} from "@/redux";

import GalaxyChangeSort from "@/components/collection_actions/galaxyChangeSort";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();
  const galaxyList = useSelector((state) => state.galaxyList);
  const [formLoaded, setFormLoaded] = useState(false);

  const initialValues = {
    search: galaxyList.criteria?.search,
    status: galaxyList.criteria?.status,
  };

  const handleFormChange = (values, data) => {
    if (formLoaded) {
      dispatch(galaxyListChangeCriteria(values));
    }
  };

  const handleSubmit = (values) => {
    // console.log(values);
    // dispatch(
    //     signup({
    //         email: values.email,
    //         password: values.password,
    //         callback: async (data) => {
    //             dispatch(fetchUserInfo());
    //             router.push("/");
    //         },
    //     }))
  };

  useEffect(() => {
    setTimeout(() => {
      setFormLoaded(true);
    }, 500);
  }, []);

  const getInitialValues = () => ({
    search: galaxyList.criteria?.search || "",
    status: galaxyList.criteria?.status || "",
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: handleSubmit,
    enableReinitialize: true, // This is important to reset form when initialValues change
  });

  useEffect(() => {
    // Update Formik's initialValues when galaxyList.criteria changes
    formik.setValues(getInitialValues());
  }, [galaxyList.criteria]);

  const statusOptions = [
    {
      label: "Unreviewed",
      value: "unreviewed",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Potential",
      value: "potential",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  return (
    <div className={`app-drawer-content-container standard-drawer`}>
      <div className={"collection-settings-container"}>
        <div className="collection-settings-header">
          <div className="collection-settings-header-left">
            <span className="collection-count-number">{galaxyList.count}</span>
            <span className="collection-count-total">
              of {galaxyList.total} items
            </span>
          </div>

          <div className="collection-settings-header-right">
            <GalaxyChangeSort />
          </div>
        </div>

        <div className="form-container">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => {
              useEffect(() => {
                handleFormChange(values);
              }, [values]);

              return (
                <Form>
                  <div className="form-fields">
                    <Field
                      name="search"
                      component={Input}
                      title="Search"
                      placeholder="Search"
                    />

                    <ul className="action-buttons">
                      <li>
                        <Button
                          type="button"
                          icon="filter-remove"
                          small={true}
                          minimal={true}
                          wrap={true}
                          label="Clear filters"
                          onClick={() => {
                            dispatch(galaxyResetCriteria());
                          }}
                        />
                      </li>

                      <li>
                        <Button
                          type="button"
                          minimal={true}
                          small={true}
                          wrap={true}
                          icon="plus"
                          label="Add galaxy"
                          onClick={() => {
                            dispatch(
                              galaxyCreate({
                                name: "New Galaxy",
                                callback: (data) => {
                                  dispatch(updateCollection(true));
                                },
                              })
                            );
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AppSettings;
