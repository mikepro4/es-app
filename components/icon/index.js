import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Popup } from 'semantic-ui-react';
import classNames from "classnames";

import LogoDesktop from "./icons/logo_desktop"
import LogoMobile from "./icons/logo_mobile"
import Mountains from "./icons/mountains"
import X from "./icons/x"
import Shapes from "./icons/shapes"
import Properties from "./icons/properties"
import Music from "./icons/music"
import Tier from "./icons/tier"
import Plus from "./icons/plus"
import Minus from "./icons/minus"
import User from "./icons/user"
import Search from "./icons/search"
import ArrowBack from "./icons/arrow_back"
import ArrowForward from "./icons/arrow_forward"
import Mic from "./icons/mic"
import Heart from "./icons/heart"
import Tick from "./icons/tick"
import Share from "./icons/share"
import MoreVertical from "./icons/more_vertical"
import MoreHorizontal from "./icons/more_horizontal"
import CaretBottom from "./icons/caret_bottom"
import CaretUp from "./icons/caret_up"
import CaretRight from "./icons/caret_right"
import CaretLeft from "./icons/caret_left"
import AudioSettings from "./icons/audio-settings"
import Atom from "./icons/atom"

const Icon = ({ name, onClick }) => {

    const selectIcon = () => {
        switch (name) {
            case "logo-desktop":
                return <LogoDesktop />
            case "logo-mobile":
                return <LogoMobile />
            case "mountains":
                return <Mountains />
            case "x":
                return <X />
            case "shapes":
                return <Shapes />
            case "properties":
                return <Properties />
            case "audio-settings":
                return <AudioSettings />
            case "music":
                return <Music />
            case "tier":
                return <Tier />
            case "plus":
                return <Plus />
            case "minus":
                return <Minus />
            case "user":
                return <User />
            case "search":
                return <Search />
            case "arrow-back":
                return <ArrowBack />
            case "arrow-forward":
                return <ArrowForward />
            case "mic":
                return <Mic />
            case "heart":
                return <Heart />
            case "tick":
                return <Tick />
            case "share":
                return <Share />
            case "more-vertical":
                return <MoreVertical />
            case "more-horizontal":
                return <MoreHorizontal />
            case "caret-bottom":
                return <CaretBottom />
            case "caret-up":
                return <CaretUp />
            case "caret-right":
                return <CaretRight />
            case "caret-left":
                return <CaretLeft />
            case "atom":
                return <Atom />

        }
    }

    return (
        <div className="icon-container" onClick={() => onClick && onClick()}>
            {selectIcon()}
        </div>
    );
}

export default Icon;