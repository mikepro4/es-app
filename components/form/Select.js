import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

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
