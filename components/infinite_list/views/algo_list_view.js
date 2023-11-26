import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import ShapeActionsView from "@/components/collection_actions/shapeActions";
import ShapeMainInfo from "@/components/shape_main_info";

import Icon from "@/components/icon";

function ShapeListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="algo-view-list-container">

           {item.name}



        </div>
    );
}

export default ShapeListView;
