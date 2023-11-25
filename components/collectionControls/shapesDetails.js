import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="collection-details">
            <div className="collection-details-left">
                <span className="collection-count-number">9</span>
                <span className="collection-count-total">of 10 items</span>
                
            </div>

            <div className="collection-details-right">
                <Button
                    minimal={true}
                    small={true}
                    wrap={true}
                    icon="plus"
                    label="Add shape"
                />
            </div>
        </div>
    );
}

export default AppSettings;
