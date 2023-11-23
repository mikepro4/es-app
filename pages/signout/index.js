
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import * as Yup from 'yup';

import { Formik, Form, Field, FieldArray } from 'formik';

import Input from "../../components/form/BladeInput";

import Button from "../../components/button";

import { toggleAlert, fetchUserInfo } from "@/redux";

import { signout } from "@/redux";



const SingleForm = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(signout())
    router.push("/login")
  }, [])


  return (
    <></>
  );
};

export default SingleForm;
