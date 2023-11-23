import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function TestListView({
    item,
    key,
    type,
    handleClick
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();


    return (
        <div className="test-view-list-container">
            {item.name}
        </div>
    );
}

export default TestListView;
