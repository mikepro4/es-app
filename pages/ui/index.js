
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../components/button";


const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();


  return (
    <div className="ui-screen page-wrapper">

      <div className="page-container">

        <h1>UI System</h1>
        <div className="button-group">
          <li>
            <Button
              small={true}
              label="Buttons"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/buttons")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Forms"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/forms")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Custom icons"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/icons")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Loader"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/loader")
              }}
            />
          </li>

          <li>
            <Button
              small={true}
              label="Popups"
              wrap={true}
              minimal={true}
              iconRight="chevron-right"
              onClick={() => {
                router.push("/ui/popups")
              }}
            />
          </li>


        </div>

      </div>


    </div>
  );
};

export default TestView;
