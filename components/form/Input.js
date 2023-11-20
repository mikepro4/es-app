import React, { PropTypes } from "react";
import classnames from "classnames";

import IconButton from "../icon_button"

const Select = ({
	input,
	label,
	large,
	type,
	children,
	placeholder,
	onChange,
	icon,
	autoFocus,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"bp3-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error,
		"has-icon": icon
	});

	return (
		<div className={containerClassName}>

			{icon && <div className="input-icon-container"><IconButton icon={icon}/></div>}

			<div className="input-group-left">
				{label ? <div className="input-label">{label}</div> : ""}
			</div>

			<div className="input-group-right bp3-select">
				<input {...input}
					className="main-input"
					placeholder={placeholder}
					autoFocus={autoFocus}
					onChange={(e) => {
						input.onChange(e); //final-form's onChange
						if (onChange) { //props.onChange
							onChange(e);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Select