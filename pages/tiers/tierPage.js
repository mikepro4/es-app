import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import TiersIcon from "@/components/icon/icons/tiers";
import InfiniteList from '@/components/infinite_list';

import TierActionsView from "@/components/collection_actions/tierActions";

import { 
    tierUpdateItem, 
    updateCollectionItem, 
    tierItem, 
    tierUpdateManyItems,
    shapeSearch,
    shapeItem,
    tierSearch
} from "@/redux";


function TierPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [tier, setTier] = useState(false);
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const [activeLetter, setActiveLetter] = useState(null);

    const [screenWidth, setScreenWidth] = useState(0);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [scroll, setScroll] = useState(0);
    const scrollContainerRef = useRef(null); 
    const [tiers, setTiers] = useState([]);


    const handleScroll = () => {
        const position = scrollContainerRef.current.scrollTop
        setScroll(position)
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        loadInitialTiers()
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


    const fetchTier = () => {
        dispatch(tierItem({
            id: router.query.tierId,
            callback: (data) => {
                console.log(data);
                setTier(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                if(data.code) {
                    setCodeItems(data.code)
                }
            }
        }))
    }

    useEffect(() => {
        fetchTier()
        if(router.query.activeLetter) {
            setActiveLetter(router.query.activeLetter)
        } else {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, activeLetter: "A"}
            }, undefined, { shallow: true });
        }
        

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == tier?._id) {
            fetchTier()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.tierId && tier?._id && router.query.tierId !== tier?._id) {
            fetchTier()
        }

        if (router.query.activeLetter && router.query.activeLetter !== activeLetter) {
            setActiveLetter(router.query.activeLetter)
        }
    }, [router]);

    const loadInitialTiers = () => {
        dispatch(
          tierSearch({
            criteria: {},
            sortProperty: "created",
            offset: 0,
            limit: 10000,
            order: -1,
    
            callback: (data) => {
              let finalOptinos = data.all.map((option) => {
                return {
                  value: option._id,
                  label: option.name,
                };
              });
              setTiers(finalOptinos);
            },
          })
        );
      };

     

    return (
        <div className="music-page-container tier-page-container" ref={scrollContainerRef}>
            <div className="music-page-center-container">

            <div className="music-page-container-header">

                <div className="music-page-container-header-left">
                    <Button
                        label="Back"
                        icon="arrow-left"
                        minimal={true}
                        small={true}
                        wrap={true}
                        onClick={() => {
                            router.push({
                                pathname: '/tiers',
                                query: { ...router.query, tierId: null },
                            }, undefined, { shallow: true })
                        }
                    }
                    />

                </div>

                <div className="music-page-container-header-right">
                <TierActionsView
                        item={tier}
                    />
                </div>
            </div>

            {/* <h1>{tier && tier.name} </h1> */}

            <div className="tiers-tree-container">
                <TiersIcon
                    activeLetters={["A", "Z", "L"]}
                />
            </div>

            <div className="tier-switcher">
                {tiers.map(tier => (
                    <div 
                        className={classNames("tier-item", {
                            "active": tier.value === router.query.tierId,
                        })}
                        key={tier._id} onClick={() =>  {
                            router.push({
                                pathname: router.pathname,
                                query: { ...router.query, tierId: tier.value}
                            }, undefined, { shallow: true });
                        }}>
                        {tier.label} 
                    </div>
                ))}
            </div>

            <div className="alphabet-city">
                {alphabet.map(letter => (
                    <div 
                        className={classNames("alphabet-letter", {
                            "active": activeLetter === letter,
                        })}
                        key={letter} onClick={() =>  {
                            router.push({
                                pathname: router.pathname,
                                query: { ...router.query, activeLetter: letter}
                            }, undefined, { shallow: true });
                        }}>
                        {letter} 
                    </div>
                ))}
            </div>

            <div className="tier-shapes-container-title">
                {count} shapes linked to tier
            </div>

            {tier && <InfiniteList
                resultType="shape-view-list"
                limit={20}
                contained={screenWidth > 500 ? true : false}
                scrollValue={scroll}
                sortProperty={"created"}
                order={"-1"}
                criteria={{
                    status: "approved",
                    tierId: tier._id,
                    tierLetter: activeLetter
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

export default TierPageContainer;
