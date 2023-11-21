import React from 'react';
import classnames from "classnames";

const TabSwitcher = ({ field, ...props }) => {
    const { options } = props; // Options for the tabs

    return (
        <div className="tab-container">

            <div className="tab-title">
                {props.title}
            </div>

            <div className="tab-switcher ">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={classnames({
                            "single-tab": true,
                            "active-tab": field.value === option.value ? true : false,
                        })}
                        onClick={() => field.onChange({ target: { name: field.name, value: option.value } })}
                    >
                        <span className="tab-label">{option.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabSwitcher;
