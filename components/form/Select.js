import React from 'react';
import Select, { components } from 'react-select';
import { useField, useFormikContext } from 'formik';
import { Icon } from "@blueprintjs/core";

const IconOption = (props) => {
	console.log(props)
	const iconName = props.data.icon;
	const isValidIcon = iconName && typeof iconName === 'string';

	return (
		<components.Option {...props}>

			<span className="option-icon-wrapper">
				{isValidIcon && <Icon icon={iconName} />} {/* Render the icon only if valid */}
			</span>

			{props.data.label}
		</components.Option>
	);
};

const CustomSingleValue = ({ children, ...props }) => {
	return (
		<components.SingleValue {...props}>
			<span className="option-icon-wrapper">
				{props.data.icon && <Icon icon={props.data.icon} />} {/* Render the icon */}
			</span>
			{children}
		</components.SingleValue>
	);
};

const CustomMultiValue = (props) => {
	return (
	  <components.MultiValue {...props}>
		<div className="multi-option-container">
			<span className="multi-option-icon-wrapper">
			{props.data.icon && <Icon icon={props.data.icon} />} {/* Render the icon */}
			</span>
			<components.MultiValueLabel {...props} />
		</div>
		
	  </components.MultiValue>
	);
  };

const SelectField = ({ options, field, ...props }) => {
	const { setFieldValue } = useFormikContext();

	// Function to handle value change
	const handleChange = (selectedOption) => {
		// If it's multi-select, selectedOption is an array
		if (props.isMulti) {
			// Store the values (or empty array if none)
			const values = selectedOption ? selectedOption.map(option => option.value) : [];
			setFieldValue(field.name, values);
		} else {
			// For single select, just store the value (or empty string if none)
			setFieldValue(field.name, selectedOption ? selectedOption.value : '');
		}
	};

	// Function to get the value for the select
	const getValue = () => {
		if (props.isMulti && field.value) {
			// For multi-select, find all options that match the field values
			return options.filter(option => field.value.includes(option.value));
		} else {
			// For single select, find the option that matches the field value
			return options.find(option => option.value === field.value);
		}
	};

	return (
		<div className="select-container">
			<div className="select-title">{props.title}</div>
			<Select
				options={options}
				name={field.name}
				value={getValue()}
				onChange={handleChange}
				onBlur={field.onBlur}
				className="react-select-container"
				classNamePrefix="react-select"
				components={{ Option: IconOption, SingleValue: CustomSingleValue, MultiValue: CustomMultiValue }}
				isMulti={props.isMulti}
				theme={(theme) => ({
					...theme,
					borderRadius: 10,
					colors: {
						...theme.colors,
						primary25: 'hotpink',
						primary: 'black',
					},
				})}
				{...props}
			/>
		</div>
	);
};

export default SelectField;
