import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";
import Button from "../../../components/button";

import { shapeUpdateManyItems, updateCollection, toggleDrawer } from "@/redux";

function AppSettings(props) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const shapeList = useSelector((state) => state.shapeList);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {

        return () => {

        };
    }, []);

    return (
        <div className="modal-content-container">
            <div className="modal-header">
                <div className="modal-header-left">
                    <div className="modal-icon">
                        <Icon icon="warning-sign" />
                    </div>
                    <div className="modal-title">
                        Update all entries
                    </div>
                </div>

                <div className="modal-header-right">
                    <Button
                        icon="cross"
                        small={true}
                        minimal={true}
                        onClick={() => {
                            props.hideModal();
                        }}>
                    </Button>
                </div>
            </div>

            <div className="modal-content">
                Are you sure you want to update all entries?
            </div>

            <div className="modal-footer">
                <div className="modal-footer-left">



                </div>

                <div className="modal-footer-right">
                    <ul className="modal-footer-actions">
                        <li className="modal-footer-action">
                            <Button
                                label="Cancel"
                                wrap={true}
                                minimal={true}
                                small={true}
                                onClick={() => {
                                    props.hideModal();
                                }} />
                        </li>
                        <li className="modal-footer-action">
                            <Button
                                label="Save"
                                wrap={true}
                                small={true}
                                onClick={() => {
                                    dispatch(
                                        shapeUpdateManyItems({
                                            initialCriteria: shapeList.criteria,
                                            newCriteria: app.modalData,
                                            callback: () => {
                                                props.hideModal();
                                                dispatch(updateCollection(true))
                                                dispatch(toggleDrawer({
                                                    drawerOpen: false,
                                                    drawerType: null,
                                                    drawerData: null
                                                }))
                                            }
                                        }))
                                }} />
                        </li>
                    </ul>


                </div>

            </div>
        </div>
    );
}

export default AppSettings;
