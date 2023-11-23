import React, { useState } from "react";
import classnames from "classnames";

function Input({ field, form: { touched, errors, setFieldValue }, onChange, ...props }) {
  const [inputFocused, setInputFocused] = useState(false);

  const onBlur = () => setInputFocused(false);
  const onFocus = () => setInputFocused(true);

  let characterCount = field.value ? field.value.toString().length : 0

  let containerClassName = classnames({
    "input-text": true,
    "input-large": props.large,
    "input-empty": characterCount === 0,
    "input-touched": touched[field.name],
    "input-valid": touched[field.name] && !errors[field.name],
    "input-invalid": touched[field.name] && errors[field.name],
    "input-focused": inputFocused
  });

  let inputClassName = classnames({
    "blade-input": true,
    "blade-intent-success": touched[field.name] && !errors[field.name],
    "blade-intent-danger": touched[field.name] && errors[field.name]
  });


  let placeholderSmallClassName = classnames({
    "input-placeholder": true,
    "input-placeholder-small": true,
    "input-placeholder-small-visible": characterCount > 0
  });

  return (
    <div className={containerClassName}>
      {(!touched[field.name] || !errors[field.name]) && (
        <div className={placeholderSmallClassName}>
          {props.placeholder ? props.title : props.placeholder}
        </div>
      )}

      {touched[field.name] && errors[field.name] && (
        <div className="input-error">
          <span>{errors[field.name]}</span>
        </div>
      )}

      <input
        {...field}
        {...props}
        className={inputClassName}
        type={props.type || "text"}
        onFocus={onFocus}
        onChange={(event) => {
          setFieldValue(field.name, event.target.value)
        }}
        onBlur={onBlur}
        autoComplete="new-password"
      />
    </div>
  );
}

export default Input;
