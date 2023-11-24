import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "../../button"
import { ConnectWallet } from "@thirdweb-dev/react";

import { toggleDrawer } from "@/redux";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {

        return () => {

        };
    }, []);

    const renderProfileContent = () => {
        return (
            <div className="profile-placeholder-content">
                <div className="profile-email">{user.userInfo.email}</div>

                {user.userInfo?._id && 
                    <div className="signout-container">
                        <Button
                            minimal={true}
                            wrap={true}
                            small={true}
                            label="Sign out"
                            onClick={() => {
                                router.push("/signout")
                                dispatch(toggleDrawer({ drawerOpen: false, drawerType: null }))
                            }}
                        />
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container profile-container"}>


                <ul className="button-container">
                    <li>
                        <ConnectWallet
                            theme={"dark"}
                            modalSize={"compact"}
                            welcomeScreen={{}}
                        />
                    </li>

                    {!user.userInfo?._id && <li>
                        <div className="button-container-group">

                            <Button
                                minimal={true}
                                label="Login"
                                onClick={() => {
                                    router.push("/login")
                                    dispatch(toggleDrawer({ drawerOpen: false, drawerType: null }))
                                }}
                            />

                            <Button
                                minimal={true}
                                label="Sign up"
                                onClick={() => {
                                    router.push("/signup")
                                    dispatch(toggleDrawer({ drawerOpen: false, drawerType: null }))
                                }}
                            />
                        </div>
                    </li>}

                    {user.userInfo?._id && <li>

                        <div className="profile-placeholder">
                            {user.userInfo?._id && renderProfileContent()}
                        </div>
                    </li>}




                </ul>

            </div>
        </div>
    );
}

export default AppSettings;
