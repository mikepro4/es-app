
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";

import { H5, Slider, Switch, Icon } from '@blueprintjs/core';

import { toggleDrawer } from '@/redux/slices/appSlice';

import SingleForm from './singleForm';

const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = useCallback((value) => {
    console.log(value);
    setValue(value), []
  });

  


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

        {/* <li style={{
          padding: "20px 10px"
        }} >
          <Slider
            min={-100}
            max={100}
            initialValue={0}
            stepSize={0.1}
            labelStepSize={50}
            value={value}
            onChange={handleChange}
            showTrackFill={value !== 0}
          />
        </li> */}

      </ul>

      </div>


    </div>
  );
};

export default TestView;
