import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import _ from "lodash";
import { toggleModal } from "../../redux";
import AppSettings from "./type/app_settings.js";
import UpdateAll from "./type/update_all.js";

function Modal() {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.app);

    const hideModal = () => {
        dispatch(toggleModal({
            modalOpen: false,
            modalType: null,
            modalData: null,
        }));
    };

    const renderModal = (type) => {
        switch (type) {
            case "app-settings":
                return <AppSettings hideModal={hideModal} enablePortal />;
            case "update-all":
                return <UpdateAll hideModal={hideModal} enablePortal />;
            default:
                return;
        }
    };


    if (app.modalOpen) {
        return (
            <div
                className={classNames({
                    "app-modal": true,
                })}>

                <div className={classNames({
                    "app-modal-container": true
                })} >
                    <div
                        className={`app-modal-background `}
                        onClick={hideModal}
                    >
                    </div>
                    <div className={`app-modal-content`}>
                        {renderModal(app.modalType)}
                    </div>
                </div>
            </div>
        );
    } else {
        return null; // or some other fallback UI
    }
}

export default Modal;
