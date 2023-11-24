
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import Label from "../../../components/label";


const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();

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


      <h1>Labels</h1>
      
      <ul className="label-group">

        <li>
            <Label
                intent="neutral"
                label="Unreviewed"
            />
        </li>

        <li>
            <Label
                intent="neutral"
                label="Unreviewed"
                icon="eye-off"
            />
        </li>

        <li>
            <Label
                intent="success"
                label="Approved"
                icon="tick"
            />
        </li>

        <li>
            <Label
                intent="success"
                label="Approved"
            />
        </li>

        <li>
            <Label
                intent="success"
                label="Approved"
                iconRight={"chevron-down"}
            />
        </li>

        <li>
            <Label
                intent="danger"
                label="Rejected"
            />
        </li>

        <li>
            <Label
                intent="danger"
                label="Rejected"
                icon="cross"
            />
        </li>

        <li>
            <Label
                intent="warning"
                label="Warning"
            />
        </li>

        <li>
            <Label
                intent="warning"
                label="Warning"
                icon="warning-sign"
            />
        </li>

        <li>
            <Label
                intent="info"
                label="Info"
            />
        </li>

        <li>
            <Label
                intent="info"
                label="Info"
                icon="info-sign"
            />
        </li>


      </ul>

      <div className="placeholder"></div>

      </div>


    </div>
  );
};

export default TestView;
