
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";

import { toggleDrawer } from '@/redux/slices/appSlice';

import SingleForm from './singleForm';

const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();


  return (
    <div className="ui-screen">
      
      <div className="page-container">
        
      <div className="back-button">
        <Button
            small={true}
            label="Back"
            wrap={true}
            minimal={true}
            icon="arrow-left"
            onClick={() => {
              router.push("/ui/")
            }}
        />
      </div>


      <h1>Forms</h1>
      
      <ul className="form-group">

        <li>
          <SingleForm/>
        </li>

      </ul>

      </div>


    </div>
  );
};

export default TestView;
