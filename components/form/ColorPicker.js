import React from 'react';
import classnames from "classnames";
import Menu from "../../components/menu"
import Button from "../../components/button";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import { use } from 'passport';

const TabSwitcher = ({ field, ...props }) => {
    const { options } = props; // Options for the tabs

    const [menuOpen, setMenuOpen] = React.useState(false);


    const [color, setColor] = React.useState({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    });

    React.useEffect(() => {
        const rgbaString = field.value;
        const rgbaArray = rgbaString
        .match(/\d+(\.\d+)?/g)
        .map(Number);
    
        const rgbaObject = {
        r: rgbaArray[0],
        g: rgbaArray[1],
        b: rgbaArray[2],
        a: rgbaArray[3],
        };
    
        setColor(rgbaObject)
    }, [menuOpen])

    return (
        <div className="color-picker-container">

            <div className="color-picker-title">
                {props.title}
            </div>

            <div className="color-picker-button">


                <Menu
                    content={
                        <div className="menu-container">
                           <RgbaColorPicker color={color}  onChange={(value) => {
                                console.log(value)
                                field.onChange({ target: { name: field.name, value: `rgba(${value.r},${value.g},${value.b}, ${value.a})` } })
                           }} />
                        </div>
                    }
                    menuOpen={menuOpen}
                >

                    <Button
                        minimal={true}
                        type="button"
                        label="Color"
                        colorRgba={field.value}
                        wrap={true}
                        onClick={() => {
                            setMenuOpen(!menuOpen)
                        }}
                    />
                </Menu>
            </div>
        </div>
    );
};

export default TabSwitcher;
