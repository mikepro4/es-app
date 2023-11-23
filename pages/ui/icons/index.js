
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

        <li>
          <Icon name="mountains" />
          <div className="icon-name">mountains</div>
        </li>

        <li>
          <Icon name="x" />
          <div className="icon-name">x</div>
        </li>

        <li>
          <Icon name="shapes" />
          <div className="icon-name">shapes</div>
        </li>

        <li>
          <Icon name="properties" />
          <div className="icon-name">properties</div>
        </li>

        <li>
          <Icon name="music" />
          <div className="icon-name">music</div>
        </li>

        <li>
          <Icon name="tier" />
          <div className="icon-name">tier</div>
        </li>

        <li>
          <Icon name="plus" />
          <div className="icon-name">plus</div>
        </li>

        <li>
          <Icon name="minus" />
          <div className="icon-name">minus</div>
        </li>

        <li>
          <Icon name="user" />
          <div className="icon-name">user</div>
        </li>

        <li>
          <Icon name="search" />
          <div className="icon-name">search</div>
        </li>

        <li>
          <Icon name="arrow-back" />
          <div className="icon-name">arrow-back</div>
        </li>

        <li>
          <Icon name="arrow-forward" />
          <div className="icon-name">arrow-forward</div>
        </li>

        <li>
          <Icon name="mic" />
          <div className="icon-name">mic</div>
        </li>

        <li>
          <Icon name="heart" />
          <div className="icon-name">heart</div>
        </li>

        <li>
          <Icon name="share" />
          <div className="icon-name">share</div>
        </li>

        <li>
          <Icon name="atom" />
          <div className="icon-name">atom</div>
        </li>


        <li>
          <Icon name="more-vertical" />
          <div className="icon-name">more-vertical</div>
        </li>

        <li>
          <Icon name="more-horizontal" />
          <div className="icon-name">more-horizontal</div>
        </li>

        <li>
          <Icon name="caret-bottom" />
          <div className="icon-name">caret-bottom</div>
        </li>

        <li>
          <Icon name="caret-up" />
          <div className="icon-name">caret-up</div>
        </li>

        <li>
          <Icon name="caret-right" />
          <div className="icon-name">caret-right</div>
        </li>

        <li>
          <Icon name="caret-left" />
          <div className="icon-name">caret-left</div>
        </li>


      </ul>

      <div className="placeholder"></div>

      </div>


    </div>
  );
};

export default TestView;
