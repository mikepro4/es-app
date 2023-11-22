
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import Loader from "../../../components/loader";


const TestView = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = useCallback((value) => {
        console.log(value);
        setValue(value), []
    });




    return (
        <div className="ui-screen">

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


                <h1>Loader</h1>

                <ul className="loader-group">

                    <li>
                        <div className="loader-example-container">
                            <Loader/>
                        </div>
                    </li>

                    <li>
                        <div className="loader-example-container">
                            <Loader
                                big={true}
                            />
                        </div>
                    </li>

                </ul>

                <div className="placeholder"></div>

            </div>


        </div>
    );
};

export default TestView;
