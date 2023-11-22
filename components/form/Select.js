import React from 'react';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useField, useFormikContext } from 'formik';
import { Icon } from "@blueprintjs/core";
import axios from 'axios';

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


const SelectField = ({ options, field, useAsync, apiUrl, ...props }) => {
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

	const loadOptions = async (inputValue) => {
		// Define the payload for the POST request
		const payload = {
		  criteria: {
		  },
		  sortProperty: "createdAt",
		  offset: 0,
		  limit: 20,
		  order: 1
		};
	  
		try {
		  // Make the POST request
		  const response = await axios.post(apiUrl, payload);
	  
		  // Transform the response data to the format { value: '', label: '' }
		  return response.data.all.map(item => ({
			value: item._id, // Adjust according to your data structure
			label: item.nft.name, // Adjust according to your data structure
			// icon: 'some-icon' // You can add icon logic here if needed
		  }));
		} catch (error) {
		  console.error("Error fetching data:", error);
		  return []; // Return an empty array in case of an error
		}
	  };

	const SelectComponent = useAsync ? AsyncSelect : Select;

	return (
		<div className="select-container">
			<div className="select-title">{props.title}</div>
			<SelectComponent
				options={options}
				name={field.name}
				value={getValue()}
				onChange={handleChange}
				onBlur={field.onBlur}
				className="react-select-container"
				classNamePrefix="react-select"
				loadOptions={useAsync ? loadOptions : undefined}
				defaultOptions={useAsync ? true : undefined}
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
