import React, { PropTypes } from "react";
import classnames from "classnames";

import { Icon } from "@blueprintjs/core";

const Select = ({
	input,
	label,
	large,
	type,
	children,
	placeholder,
	onChange,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"bp3-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	return (
		<div className={containerClassName}>
			<div className="input-group-left">
				{label ? <div className="input-label">{label}</div> : ""}
			</div>

			<div className="input-group-right bp3-select chxt-select">
				<select {...input}
					className="main-select"
					onChange={(e) => {
						input.onChange(e); //final-form's onChange
						if (onChange) { //props.onChange
							onChange(e);
						}
					}}
				>{children}</select>
				<div className="select-caret">
					<Icon icon="chevron-down"/>
				</div>

				{touched && error ? (
					<div className="input-error">
						{touched && error && <span>{error}</span>}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Select