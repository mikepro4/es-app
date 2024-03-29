import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from "next/link";
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";

import { hsbToRgba } from "@/utils/hsbToRgba";
import { hexToRgba } from "@/utils/hexToRgba";

import Loader from "../loader";

const Button = (props) => {
  // Hooks for Redux state and dispatch can be used if needed
  // const dispatch = useDispatch();
  // const someState = useSelector((state) => state.someState);

  const renderChevron = () => {
    return (
      <div
        className={classNames({
          "icon-right": true,
          "chevron-right": props.chevron === "right",
          "chevron-top": props.chevron === "top",
          "chevron-bottom": props.chevron === "bottom"
        })}
      >
        <Icon name="chevron-right" />
      </div>
    );
  };

  const renderIconLeft = () => {
    return (
      <div
        className={classNames({
          "icon-left": true,
          "chevron-right": props.chevron === "right",
          "small": props.small
        })}
        style={{
          "position": "relative",
          left: props.offset ? props.offset : 0
        }}
      >
        <Icon icon={props.icon} />
      </div>
    );
  };

  const renderIconRight = () => {
    return (
      <div
        className={classNames({
          "icon-right": true,
        })}
      >
        <Icon icon={props.iconRight} />
      </div>
    );
  };

  const renderColor = () => {

    let color 

    if(props.colorHsb) {
      color = hsbToRgba(props.colorHsb)
    } else if(props.colorHex) {
      color= hexToRgba(props.colorHex)
    } else if(props.colorRgba) {
      color= props.colorRgba
    }
    return (
      <div
        className={classNames({
          "color-display": true,
        })}
        style={{
          backgroundColor: color
        }}
      >
        
      </div>
    );
  };

  return (
    <div
      className={classNames({
        "chxt-button": true,
        "minimal": props.minimal,
        "primary": props.primary,
        "green": props.green,
        "purple": props.purple,
        "small": props.small,
        "chevron-only": !props.icon && !props.label && props.chevron,
        "action-list-item": props.actionList,
        "disabled": props.disabled,
        "icon-only": props.icon && !props.label && !props.chevron,
        "wrap": props.wrap,
        "has-left-icon": props.icon,
      })}
    >
      <button
        type={props.type}
        onClick={(e) => props.onClick && !props.disabled && props.onClick(e)}
        className={classNames({
          "only-icon": !props.chevron && !props.label,
          "only-color": (props.colorHsb || props.colorHex || props.colorRgba) && !props.label && true
        })}
      >
        <div 
          className={classNames({
            "button-content": true,
            "loading": props.loading,
          })}
        >
          
          {(props.colorHsb || props.colorHex || props.colorRgba) && renderColor()}
          {props.icon && renderIconLeft()}
          {props.label && (
            <div className="button-label">
              {props.label}
              {props.iconRight && renderIconRight()}
            </div>
          )}
          {props.chevron && renderChevron()}

        </div>
        {props.loading && <div className="button-loader">
          <Loader />
        </div> }
      </button>
    </div>
  );
};

export default Button;
