
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import * as Yup from 'yup';

import { Formik, Form, Field, FieldArray } from 'formik';

import Input from "../../components/form/BladeInput";

import Button from "../../components/button";

import { toggleAlert, fetchUserInfo } from "@/redux";

import { signup } from "@/redux";



const SingleForm = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(/^[A-Za-z\d!@#$%^&*]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
      .matches(/^\S*$/, "Password cannot contain spaces"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required("Please confirm your password"),
  });

  const handleFormChange = (values) => {
    console.log(values);
  };

  const handleSubmit = (values) => {
    console.log(values); // Process form submission

    dispatch(
      signup({
        email: values.email,
        password: values.password,
        callback: async (data) => {
          dispatch(fetchUserInfo());
          // router.push("/");
        },
      }))
  };

  useEffect(() => {
    if(user.userInfo?._id) {
      setLoggedIn(true);
    }
  }, [user])

  if(loggedIn) {
    return (
      <div className="ui-screen">

        <h1>Sign up</h1>

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

      <h1>Sign up</h1>
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

                  <Field
                    name="confirm_password"
                    component={Input}
                    type="password"
                    title="Confirm password"
                    placeholder="Confirm password"
                  />

                </div>

                <Button
                  // type="submit"
                  label="Sign up"
                />
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SingleForm;
