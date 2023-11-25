import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { togglePlayer, shapeItem  } from "@/redux";

function Shape() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch()

    const fetchShape = () => {
        dispatch(
            shapeItem({
                shapeId: query.shapeId,
                callback: (data) => {
                    console.log("loaded shape", data)
                    dispatch(
                        togglePlayer({
                            playerOpen: true,
                            playerData: data
                        })
                    )
                }
            })
        )
    }

    useEffect(() => {
        if (query.shapeId) {
            fetchShape()
        }

        return () => {
            
        };
    }, [router]); 

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"details-container"}>
                {/* Shape */}

                <div className="placeholder"></div>
            </div>
        </div>
    );
}

export default Shape;
