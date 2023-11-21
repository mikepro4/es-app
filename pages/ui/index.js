
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../components/button";


const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();


  return (
    <div className="ui-screen">
      <div className="back-button">
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
      </div>
    
    </div>
  );
};

export default TestView;
