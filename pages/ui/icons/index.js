
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import Icon from "../../../components/icon";


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


      <h1>Custom Icons</h1>
      
      <ul className="icon-group">

        <li>
          <Icon name="logo-desktop" />

          <div className="icon-name">logo-desktop</div>
        </li>

        <li>
          <Icon name="logo-mobile" />
          <div className="icon-name">logo-mobile</div>
        </li>



      </ul>

      </div>


    </div>
  );
};

export default TestView;
