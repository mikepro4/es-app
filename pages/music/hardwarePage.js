import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";
import ImageUpload from "@/components/image_upload";

import HardwareActionsView from "@/components/collection_actions/hardwareActions";

import { 
    hardwareUpdateItem, 
    updateCollectionItem, 
    hardwareItem, 
    hardwareUpdateManyItems,
    shapeSearch,
    shapeItem
} from "@/redux";

import InfiniteList from '@/components/infinite_list'

function HardwarePageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [hardware, setHardware] = useState(false);
    const [scroll, setScroll] = useState(0);
    const scrollContainerRef = useRef(null);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

    

    const fetchHardware = () => {
        dispatch(hardwareItem({
            id: router.query.hardwareId,
            callback: (data) => {
                console.log(data);
                setHardware(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
            }
        }))
    }

    useEffect(() => {
        fetchHardware()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == hardware?._id) {
            fetchHardware()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.hardwareId && hardware?._id && router.query.hardwareId !== hardware?._id) {
            fetchHardware()
        }
    }, [router]);

    const updateItemImage = (imageLink) => {
        dispatch(
            hardwareItem({
              id: hardware?._id,
              callback: (data) => {
                dispatch(
                  hardwareUpdateItem({
                    data: {
                      ...data,
                      imageLink: imageLink,
                    },
                    callback: (data) => {
                        dispatch(updateCollectionItem(hardware?._id))
                    },
                  })
                );
              },
            })
          );
    }

    const handleScroll = () => {
        const position = scrollContainerRef.current.scrollTop
        setScroll(position)
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', handleResize);
        };

    }, []);
     

    return (
        <div className="music-page-container hardware-page-container" ref={scrollContainerRef}>
            <div className="music-page-center-container">

                <div className="music-page-container-header">

                    <div className="music-page-container-header-left">
                        <Button
                            label="All hardware"
                            icon="arrow-left"
                            minimal={true}
                            small={true}
                            wrap={true}
                            onClick={() => {
                                router.push({
                                    pathname: '/music',
                                    query: { ...router.query, hardwareId: null },
                                }, undefined, { shallow: true })
                            }
                        }
                        />

                    </div>

                    <div className="music-page-container-header-right">
                    <HardwareActionsView
                            item={hardware}
                        />
                    </div>
                </div>

                <h1>{hardware && hardware.name} </h1>

                <div 
                    className={classNames("image-display-container", {
                        "hasImage": hardware && hardware.imageLink
                    })}
                >
                    <div className="image-container">
                        {hardware && hardware.imageLink && <img src={hardware.imageLink} />}
                        {hardware && !hardware.imageLink && <Icon name="x"/>}
                    </div>

                    <div className="image-container-overlay">
                        <ImageUpload
                            callback={(data) => {
                                console.log("IMAGE UPLOAD", data);
                                updateItemImage(data)
                            }}
                        />
                    </div>
                    

                    {hardware && hardware.imageLink && <div className="image-remove">
                        <Button
                            label="Delete image"
                            small={true}
                            wrap={true}
                            minimal={true}
                            onClick={() => {
                                updateItemImage("")
                            }}
                        />
                    </div>}

                </div>

                {count > 0 && <div className="album-linked-shapes-container">
                    {count} shapes linked to hardware
                </div>}

                {hardware && hardware._id && <InfiniteList
                        resultType="shape-view-list"
                        limit={20}
                        contained={screenWidth > 500 ? true : false}
                        scrollValue={scroll}
                        sortProperty={"created"}
                        order={"-1"}
                        criteria={{
                            status: "approved",
                            hardware: hardware._id
                        }}
                        // identifier={this.props.query.folder}
                        searchCollection={shapeSearch}
                        updateCollectionStats={(count, total) => {
                            setCount(count)
                            setTotal(total)
                            // dispatch(shapeListUpdateStats({ count: count, total: total }))

                        }}
                        loadCollectionItem={shapeItem}
                        handleClick={() => { }}
                />}
            </div>

            
            
           
        </div>
    );
}

export default HardwarePageContainer;
