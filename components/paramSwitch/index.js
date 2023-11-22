import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Popup } from 'semantic-ui-react';
import classNames from "classnames";
import Icon from "../icon"
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
                        sdfd

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
                        <Icon name={menuOpen ? "caret-up" : "caret-bottom"} />
                    </div>
                </div>

            </Menu>
        </div>

    );
}

export default ParamSwitch;