import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const TabBar = ({ tabs, activeTab, onTabChange, onClick }) => {
    const tabClasses = classNames({
        'tab-container': true,
    });

    return (
        <div className={tabClasses}>
            <ul className="tab-list">
                {tabs.map((tab, i) => (
                    <li 
                        key={tab} 
                        className={classNames("tab-link-container", {
                            "tab-link-active": (i + 1) === activeTab
                        })}
                    >
                        <div 
                            className="tab-link-wrapper" 
                            onClick={() => {
                                if ((i + 1) !== activeTab) {
                                    onTabChange(i + 1);
                                }

                                if(onClick) onClick(i+1)

                            }}
                        >
                            <span>{tab}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabBar;
