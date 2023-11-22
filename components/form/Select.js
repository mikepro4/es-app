import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const SelectField = ({ options, ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);
	return (
		<div className="select-container">
			<div className="select-title">{props.title}</div>
			<Select
				options={options}
				name={field.name}
				value={options ? options.find(option => option.value === field.value) : ''}
				onChange={(option) =>  setFieldValue(field.name, option.value)}
				onBlur={field.onBlur}
				className="react-select-container"
  				classNamePrefix="react-select"
				theme={(theme) => {
					console.log(theme)

					return({
					...theme,
					borderRadius: 10,
					colors: {
					  ...theme.colors,
					  primary25: 'hotpink',
					  primary: 'black',
					},
				  })
				}}
				{...props}
			/>
		</div>

	);
};

export default SelectField;
