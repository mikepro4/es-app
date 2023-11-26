import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import ParamSwitch from "@/components/paramSwitch";
import { shapeCreate, updateCollection } from "@/redux"

import ShapeChangeSort from "@/components/collection_actions/shapeChangeSort"

import { OverlayToaster } from '@blueprintjs/core';

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const shapeList = useSelector((state) => state.shapeList);
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
                <span className="collection-count-number">{shapeList.count}</span>
                <span className="collection-count-total">of {shapeList.total} items</span>
                
            </div>

            <div className="change-sort-container">
                    <ShapeChangeSort />
                </div>

            <div className="collection-details-right">
                <ul className="action-buttons">
                    <li>
                        <Button
                            minimal={true}
                            small={true}
                            wrap={true}
                            icon="plus"
                            label="Add shape" 
                            onClick={() => {
                                dispatch(
                                    shapeCreate(
                                      {
                                        name: "New Shape",
                                        callback: (data) => {
                                          toasterRef.current.show({ message: `${data.name} was created` });
                                          dispatch(updateCollection(true))
                                        }
                                      },)
                                  )
                            }}
                        />
                    </li>

                    <li>
                    <ParamSwitch
                            type="local-icon"
                            icon="more-vertical"
                            value=""
                            position="bottom right"
                            offset={[10,0]}
                            params={[
                                {
                                    type: "links",
                                    values: [
                                        {
                                            label: "Update all",
                                            value: "update",
                                            icon: "edit"
                                        },
                                        {
                                            label: "Approve all",
                                            value: "approve",
                                            icon: "tick"
                                        },
                                        {
                                            label: "Reject all",
                                            value: "cross",
                                            icon: "tick"
                                        },
                                        {
                                            label: "Potential all",
                                            value: "potential",
                                            icon: "star"
                                        },
                                    ],
                                }
                            ]}
                            onChange={(value) => {
                                // alert(value)
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
