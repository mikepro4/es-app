
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import ParamSwitch from "../../../components/paramSwitch";

import { toggleModal } from '@/redux';


const TestView = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [param1, setParam1] = useState("latest");


    return (
        <div className="ui-screen page-wrapper">

            <div className="page-container">

                <div className="back-button">
                    <Button
                        small={true}
                        label="Back"
                        wrap={true}
                        minimal={true}
                        icon="arrow-left"
                        onClick={() => {
                            router.push("/ui/")
                        }}
                    />
                </div>


                <h1>Popups</h1>

                <ul className="params-group">

                    <li>
                        <div className="params-row">
                            <ParamSwitch
                                label="Sort by:"
                                value={param1}
                                position="bottom left"
                                params={[
                                    {
                                        type: "links",
                                        title: "Section",
                                        priority: "primary",
                                        values: [
                                            {
                                                label: "Latest",
                                                value: "latest",
                                                icon: "time"
                                            },
                                            {
                                                label: "Oldest",
                                                value: "oldest",
                                                icon: "build"
                                            },
                                            {
                                                label: "Popular",
                                                value: "popular",
                                                icon: "clean"
                                            }
                                        ],
                                    },
                                    {
                                        type: "divider",
                                        values: [
                                        ],
                                    },
                                    {
                                        type: "links",
                                        priority: "secondary",
                                        values: [
                                            {
                                                label: "Other",
                                                value: "other",
                                                icon: "comment"
                                            },
                                        ],
                                    },
                                ]}
                                onChange={(value) => {
                                    setParam1(value);
                                }}
                            />

                            <ParamSwitch
                                label="Something else:"
                                value={param1}
                                position="bottom left"
                                params={[
                                    {
                                        type: "links",
                                        values: [
                                            {
                                                label: "Latest",
                                                value: "latest",
                                                icon: "time"
                                            },
                                            {
                                                label: "Oldest",
                                                value: "oldest",
                                                icon: "build"
                                            },
                                            {
                                                label: "Popular",
                                                value: "popular",
                                                icon: "clean"
                                            }
                                        ],
                                    }
                                ]}
                                onChange={(value) => {
                                    setParam1(value);
                                }}
                            />
                        </div>

                    </li>

                    <li>

                        <Button
                            label="Show modal"
                            minimal={true}
                            onClick={() => {
                                // router.push("/ui/")
                                dispatch(toggleModal({
                                    modalOpen: true,
                                    modalType: "app-settings",
                                    modalData: null,
                                }));
                            }}
                        />

                    </li>


                </ul>

                <div className="placeholder"></div>

            </div>


        </div>
    );
};

export default TestView;
