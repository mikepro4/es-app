import React from 'react';
import classnames from "classnames";
import Menu from "../../components/menu"
import Button from "../../components/button";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import { use } from 'passport';

import { hsbToRgba } from "../../utils/hsbToRgba";
import { rgbaToHsb } from "../../utils/rgbaToHsb";

const TabSwitcher = ({ field, ...props }) => {
    const { options } = props; // Options for the tabs

    const [menuOpen, setMenuOpen] = React.useState(false);


    const [color, setColor] = React.useState({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    });

    const [hsb, setHsb] = React.useState({
        h: 0,
        s: 0,
        brightness: 0,
    });


    const getRgbaObject = (value) => {
        const rgbaString = value;
        const rgbaArray = rgbaString
            .match(/\d+(\.\d+)?/g)
            .map(Number);

        const rgbaObject = {
            r: rgbaArray[0],
            g: rgbaArray[1],
            b: rgbaArray[2],
            a: rgbaArray[3],
        };

        return rgbaObject;
    }

    React.useEffect(() => {
        setColor(getRgbaObject(field.value))
    }, [menuOpen])

    React.useEffect(() => {
        let hsbValues = rgbaToHsb(getRgbaObject(field.value).r, getRgbaObject(field.value).g, getRgbaObject(field.value).b)
        setHsb(hsbValues)
    }, [])

    const getRgbaChange = (value, position) => {
        if (position == "r") {
            return `rgba(${value ? value : 0},${color.g},${color.b}, ${color.a})`
        }

        if (position == "g") {
            return `rgba(${color.r},${value ? value : 0},${color.b}, ${color.a})`
        }

        if (position == "b") {
            return `rgba(${color.r},${color.g},${value ? value : 0}, ${color.a})`
        }

        if (position == "a") {
            return `rgba(${color.r},${color.g},${color.b}, ${value ? value : 0})`
        }

    }

    const handleFocus = (event) => event.target.select();

    const renderValue = (value) => {

        if (value == "hex") {
            return (
                <div className="color-value-container">
                    hex
                </div>
            )
        }

        if (value == "r" || value == "g" || value == "b" || value == "a") {
            return (
                <div className="color-value-container">
                    <input
                        className="color-value-input"
                        value={getRgbaObject(field.value)[value]}
                        onFocus={handleFocus}
                        onChange={(e) => {

                            let finalValue

                            if (e.target.value) {
                                if(value == "a" && e.target.value > 1) {
                                    finalValue = e.target.value / 10
                                } else {
                                    finalValue = e.target.value
                                }
                            } else {
                                finalValue = 0
                            }
                            let updatedRgba = getRgbaChange(finalValue, value)
                            if (e.target.value) {

                            }
                            field.onChange({ target: { name: field.name, value: updatedRgba } })
                            setColor(getRgbaObject(updatedRgba))

                            let hsbValues = rgbaToHsb(getRgbaObject(updatedRgba).r, getRgbaObject(updatedRgba).g, getRgbaObject(updatedRgba).b)
                            setHsb(hsbValues)
                            
                        }
                        }
                    />
                </div>
            )
        }

        if (value == "h" || value == "s" || value == "brightness") {
            return (
                <div className="color-value-container">
                    <input
                        className="color-value-input"
                        value={hsb[value]}
                        onFocus={handleFocus}
                        onChange={(e) => {

                            let finalValue = Math.round(e.target.value)

                            let newHsb = {
                                ...hsb,
                                [value]: finalValue
                            }
                            console.log("newHsb", newHsb)


                            let finalRgba = hsbToRgba([newHsb.h, newHsb.s, newHsb.brightness, color.a])

                            field.onChange({ target: { name: field.name, value: finalRgba } })
                            setHsb(newHsb)
                            setColor(getRgbaObject(finalRgba))
                        }
                        }
                    />
                </div>
            )
        }


    }



    return (
        <div className="color-picker-container">

            <div className="color-picker-title">
                {props.title}
            </div>

            <div className="color-picker-button">


                <Menu
                    content={
                        <div className="menu-container">
                            <RgbaColorPicker color={color} onChange={(value) => {
                                console.log(value)
                                field.onChange({ target: { name: field.name, value: `rgba(${value.r},${value.g},${value.b}, ${value.a})` } })
                                let hsbValues = rgbaToHsb(value.r, value.g, value.b)
                                setHsb(hsbValues)
                                console.log("hsbValues", hsbValues)
                            }} />

                            <div className="color-value-row">

                                <div className="value-row-title">
                                    RGBA
                                </div>

                                <div className="value-row-content">
                                    {renderValue("r")}
                                    {renderValue("g")}
                                    {renderValue("b")}
                                    {renderValue("a")}
                                </div>

                            </div>

                            <div className="color-value-row">

                                <div className="value-row-title">
                                    HSBA
                                </div>

                                <div className="value-row-content">
                                    {renderValue("h")}
                                    {renderValue("s")}
                                    {renderValue("brightness")}
                                    {renderValue("a")}
                                </div>
                                
                            </div>

                            <div className="color-value-row">

                                <div className="value-row-title">
                                    HEX
                                </div>

                                {renderValue("hex")}

                            </div>

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
