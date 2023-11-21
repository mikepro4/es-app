import React from 'react';
import classnames from "classnames";
import Button from "../../components/button";

const TabSwitcher = ({ field, ...props }) => {
    const { options } = props; // Options for the tabs

    return (
        <div className="color-picker-container">

            <div className="color-picker-title">
                {props.title}
            </div>

            <div className="color-picker-button">
                <Button
                    minimal={true}
                    type="button"
                    label="Show drawer"
                    colorRgba={field.value}
                    wrap={true}
                    onClick={() => {

                    }}
                />
            </div>
        </div>
    );
};

export default TabSwitcher;
