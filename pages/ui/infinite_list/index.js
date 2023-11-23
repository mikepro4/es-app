
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";

import { OverlayToaster } from '@blueprintjs/core';

import { testCreate } from "@/redux"

const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const toasterRef = useRef(null)

  const [value, setValue] = useState(0);

  const handleChange = useCallback((value) => {
    console.log(value);
    setValue(value), []
  });




  return (
    <div className="ui-screen page-wrapper">

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


        <h1>Infinite List</h1>

        <ul className="controls-container">
          <li className="single-control">
            <Button
              small={true}
              label="Add Test"
              wrap={true}
              minimal={true}
              icon="plus"
              onClick={() => {
                dispatch(
                  testCreate(
                    {
                      name: "New Test",
                      callback: (data) => {
                        toasterRef.current.show({ message: `${data.name} was created` });
                      }
                    },)
                )
                // router.push("/ui/")
              }}
            />
          </li>
        </ul>

        <OverlayToaster ref={toasterRef} />


      </div>


    </div>
  );
};

export default TestView;
