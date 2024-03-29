import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import ParamSwitch from "@/components/paramSwitch";
import { tierCreate, updateCollection } from "@/redux"

import TierChangeSort from "@/components/collection_actions/tierChangeSort"

import { OverlayToaster } from '@blueprintjs/core';

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const tierList = useSelector((state) => state.tierList);
    const router = useRouter();
    const dispatch = useDispatch();
    const toasterRef = useRef(null)


    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="collection-details">
            <div className="collection-details-left">
                <span className="collection-count-number">{tierList.count}</span>
                <span className="collection-count-total">of {tierList.total} items</span>
                
            </div>

            <div className="change-sort-container">
                    <TierChangeSort />
                </div>

            <div className="collection-details-right">
                <ul className="action-buttons">
                    <li>
                        <Button
                            minimal={true}
                            small={true}
                            wrap={true}
                            icon="plus"
                            label="Add tier" 
                            onClick={() => {
                                dispatch(
                                    tierCreate(
                                      {
                                        name: "New Tier",
                                        callback: (data) => {
                                          toasterRef.current.show({ message: `${data.name} was created` });
                                          dispatch(updateCollection(true))
                                        }
                                      },)
                                  )
                            }}
                        />
                    </li>

                    

                    <OverlayToaster ref={toasterRef} />

                    
                </ul>

                


                
            </div>
        </div>
    );
}

export default AppSettings;
