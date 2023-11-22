import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Popup } from 'semantic-ui-react';
import classNames from "classnames";

import LogoDesktop from "./icons/logo_desktop"
import LogoMobile from "./icons/logo_mobile"

const Icon = ({name, style}) => {

    const selectIcon = () => {
        switch(name) {
            case "logo-desktop":
                return <LogoDesktop style={style} />
            case "logo-mobile":
                return <LogoMobile style={style} />
            
        }
    }

    return (
        <div className="icon-container">
            {selectIcon()}
        </div>
    );
}

export default Icon;