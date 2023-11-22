import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Popup } from 'semantic-ui-react';
import classNames from "classnames";
import LocalIcon from "../icon"
import { Icon } from "@blueprintjs/core";

import Menu from "../menu"

const ParamSwitch = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = React.useRef(null);
    const switchRef = React.useRef(null);


    const getValue = (searchValue) => {
        const found = props.params.flatMap(item => item.values || []).find(val => val.value === searchValue);
        return found || null; // Return the found object or null if not found
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {

            if (switchRef.current && !switchRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div
            className={classNames({
                "param-switch-container": true,
            })}
        >
            <Menu
                content={
                    <div ref={menuRef} className="menu-container" >
                        <div className="menu-section-list">
                            {props.params.map((item, index) => {
                                return (
                                    <div key={index} 
                                        className={classNames({
                                            "menu-section": true,
                                            "section-divider": item.type==="divider"
                                        })}
                                    >
                                        {item.title && <div className="menu-section-title">
                                            {item.title}
                                        </div>}

                                        <div className="menu-section-values">
                                            {item.values && item.values.length > 0 && item.values.map((val, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={classNames({
                                                            "menu-section-value": true,
                                                            "active": props.value === val.value
                                                        })}
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            props.onChange(val.value);
                                                        }}
                                                    >
                                                        {val.icon && <div className="menu-section-value-icon">
                                                            <Icon icon={val.icon} />
                                                        </div>}
                                                        <div className="menu-section-value-label">
                                                            {val.label}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                }
                position={props.position}
                menuOpen={menuOpen}
            >

                <div className="param-switch-content" ref={switchRef} onClick={() => setMenuOpen(!menuOpen)}>
                    {props.label && <div className="param-switch-label">
                        {props.label}
                    </div>}

                    {props.value && <div className="param-switch-value">
                        {getValue(props.value).label}
                    </div>}

                    <div className="param-switch-caret">
                        <LocalIcon name={menuOpen ? "caret-up" : "caret-bottom"} />
                    </div>
                </div>

            </Menu>
        </div>

    );
}

export default ParamSwitch;