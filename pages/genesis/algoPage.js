import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import Button from "@/components/button";

function AlgoPageContainer({
    item
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="algo-page-container">

            <div className="algo-page-content">

                <Button
                    label="Back"
                    icon="arrow-left"
                    minimal={true}
                    small={true}
                    wrap={true}
                    onClick={() => {
                        router.push({
                            pathname: '/genesis',
                            query: { ...router.query, algoId: null },
                        }, undefined, { shallow: true })
                    }}
                />

                <div className="algo-page-form">
                    Algo page

                    <div className="placeholder"></div>
                </div>


            </div>
        </div>
    );
}

export default AlgoPageContainer;
