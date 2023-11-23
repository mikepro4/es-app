
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import * as Yup from 'yup';

import { Formik, Form, Field, FieldArray } from 'formik';

import Input from "../../components/form/BladeInput";

import Button from "../../components/button";

import { toggleAlert, fetchUserInfo } from "@/redux";

import { signin } from "@/redux";


import {
  OverlayToaster,
} from "@blueprintjs/core";


const SingleForm = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const toasterRef = useRef(null)

  const [loggedIn, setLoggedIn] = useState(false);

  const initialValues = {
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });

  const handleFormChange = (values) => {
    console.log(values);
  };

  const handleSubmit = (values) => {
    console.log(values); // Process form submission

    dispatch(
      signin({
        email: values.email,
        password: values.password,
        callback: async (data) => {
          dispatch(fetchUserInfo());
          router.push("/");
        },
      }))
  };

  useEffect(() => {
    if (user.userInfo?._id) {
      setLoggedIn(true);
    }
  }, [user])

  useEffect(() => {
    if (user.errorMessage) {
      let toastOptions = {
        message: user.errorMessage,
      }
      toasterRef.current.show({ ...toastOptions });
    }
  }, [user])

  if (loggedIn) {
    return (
      <div className="ui-screen">

        <h1>Login</h1>

        <p>You're already signed up please sign out if you want to change account.</p>

        <Button
          // type="submit"
          minimal={true}
          label="Sign out"
          onClick={() => {
            router.push("/signout")
          }}
        />
      </div>
    )
  }

  return (
    <div className="ui-screen">
      <div className="page-container">

        <h1>Login</h1>
        <div className="form-container">

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
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
                      name="email"
                      component={Input}
                      title="Email address"
                      placeholder="Email address"
                    />

                    <Field
                      name="password"
                      component={Input}
                      title="Password"
                      type="password"
                      placeholder="Password"
                    />

                  </div>

                  <Button
                    // type="submit"
                    label="Login"
                  />
                </Form>
              )
            }}
          </Formik>
          <OverlayToaster ref={toasterRef} />
        </div>
      </div>
    </div>
  );
};

export default SingleForm;
