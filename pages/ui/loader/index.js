
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import Loader from "../../../components/loader";


const TestView = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const handleChange = useCallback((value) => {
        console.log(value);
        setValue(value), []
    });

    useEffect(() => {
        if(loading)  {
            setLoading(true)

            setTimeout(() => {
                setLoading(false)
            }, 2000);
        }
       
    }, [loading]);




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

                        <Button
                            minimal={true}
                            small={true}
                            label="Show loader"
                            wrap={true} 
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            small={true}
                            label="Show loader"
                            wrap={true} 
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            small={true}
                            label="Show loader"
                            wrap={true} 
                            primary={true}
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            minimal={true}
                            label="Show loader"
                            wrap={true} 
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            label="Show loader"
                            wrap={true} 
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            label="Show loader"
                            wrap={true} 
                            primary={true}
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>


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

                    {/* NEW */}

                    <li>

                        <Button
                            minimal={true}
                            icon="edit"
                            small={true}
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            small={true}
                            icon="edit"
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            small={true}
                            icon="edit"
                            primary={true}
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            minimal={true}
                            icon="edit"
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            icon="edit"
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                        
                    </li>

                    <li>

                        <Button
                            primary={true}
                            icon="edit"
                            loading={loading}
                            onClick={() => {
                                setLoading(true)
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
