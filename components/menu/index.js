import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Popup } from 'semantic-ui-react';
import classNames from "classnames";

const Menu = (props) => {

    const style = {
        borderRadius: 0,
        opacity: 1,
        color: 'black',
        fontSize: "11px",
        padding: "8px 10px",
        borderRadius: "10px",
        zIndex: "100"
    };

    return (
        <div
            className={classNames({
                "status-container": true,
            })}
        >
            {!props.pinned && <Popup
                content={props.content}
                position={props.position ? props.position : 'top left'}
                className="popover"
                style={style}
                on="hover"
                offset={[-10, -2]}
                trigger={props.children}
                open={props.menuOpen}
            />}

            {props.pinned && <Popup
                content={props.content}
                position='bottom right'
                className="popover"
                style={style}
                on="hover"
                offset={[10, -2]}
                trigger={props.children}
                pinned
            />}
        </div>
    );
}

export default Menu;