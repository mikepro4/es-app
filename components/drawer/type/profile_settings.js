import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "../../button"

import { toggleDrawer } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container profile-container"}>
                <div className="profile-placeholder">

                </div>

                <ul className="button-container">
                    <li>
                        <Button
                            label="Connect Wallet"
                            onClick={() => {
                            }}
                        />
                    </li>

                    <li>
                        <div className="button-container-group">

                            <Button
                                minimal={true}
                                label="Login"
                                onClick={() => {
                                    router.push("/login")
                                    dispatch(toggleDrawer({drawerOpen: false, drawerType: null}))
                                }}
                            />

                            <Button
                                minimal={true}
                                label="Sign up"
                                onClick={() => {
                                    router.push("/signup")
                                    dispatch(toggleDrawer({drawerOpen: false, drawerType: null}))
                                }}
                            />
                        </div>
                    </li>
                    

                </ul>

            </div>
        </div>
    );
}

export default AppSettings;
