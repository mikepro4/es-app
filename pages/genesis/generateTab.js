import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";

import { trackSearch, shapeSearch } from '@/redux'

import { shapeUpdateTrack , shapeUpdateGenesis} from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    const [shapes, setShapes] = useState([]);
    const [tracks, setTracks] = useState([]);

    const searchTracks = () => {
        dispatch(
            trackSearch({
                criteria: {},
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: 1,

                callback: (data) => {
                    setTracks(data.all);
                },
            })
        );
    }

    const searchShapes = () => {
        dispatch(
            shapeSearch({
                criteria: {
                    status: "approved"
                },
                sortProperty: "created",
                offset: 0,
                limit: 10000,
                order: 1,

                callback: (data) => {
                    setShapes(data.all);
                },
            })
        );
    }


    const assignTracks = () => {

          // Assuming each track is assigned to 6 shapes
            const shapesPerTrack = 6;
            let assignedShapes = shapes.map((shape, index) => {
                // Calculate which track should be assigned to this shape
                // const trackIndex = Math.floor(index / shapesPerTrack) % tracks.length;
                // const assignedTrack = tracks[trackIndex];

                // dispatch(shapeUpdateTrack(
                //     {
                //         shapeId: shape._id,
                //         trackId: assignedTrack._id
                //     }
                // ))

                dispatch(shapeUpdateGenesis({
                    shapeId: shape._id
                }))

                return 

            });

    }



    useEffect(() => {
        searchShapes()
        searchTracks()

        return () => {
            
        };
    }, []); 

    return (
        <div>
            <div>
                Tracks: {tracks?.length}
            </div>

            <div>
                Shapes: {shapes?.length}
            </div>

            <div>
                <Button
                    label="Assign tracks to shape"
                    onClick={() => {
                        assignTracks()
                    }}
                />
            </div>

        </div>
    );
}

export default AppSettings;
