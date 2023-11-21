import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // if you need to access Redux state
import classnames from "classnames";

function Input(props) {
  const [inputFocused, setInputFocused] = useState(false);

  const onBlur = () => setInputFocused(false);
  const onFocus = () => setInputFocused(true);

  let characterCount = props.input.value.toString().length;

  let containerClassName = classnames({
    "input-text": true,
    "input-large": props.large,
    "input-empty": characterCount === 0,
    "input-touched": props.meta.touched,
    "input-valid": props.meta.touched && !props.meta.error,
    "input-invalid": props.meta.touched && props.meta.error,
    "input-focused": inputFocused
  });

  let inputClassName = classnames({
    "blade-input": true,
    "blade-intent-success": props.meta.touched && !props.meta.error,
    "blade-intent-danger": props.meta.touched && props.meta.error
  });

  let placeholderLargeClassName = classnames({
    "input-placeholder": true,
    "input-placeholder-large": true,
    "input-placeholder-large-visible": !inputFocused && characterCount === 0
  });

  let placeholderSmallClassName = classnames({
    "input-placeholder": true,
    "input-placeholder-small": true,
    "input-placeholder-small-visible": inputFocused || characterCount > 0
  });
  console

  return (
    <div className={containerClassName}>
      {(!props.meta.touched || props.meta.valid) && (
        <div className={placeholderSmallClassName}>
          {props.placeholder ? props.title : props.placeholder}
        </div>
      )}

      {props.meta.touched && props.meta.error && (
        <div className="input-error">
          <span>{props.meta.error}</span>
        </div>
      )}

      <div className={placeholderLargeClassName}>
        {props.meta.touched && !props.meta.valid ? props.meta.error : props.placeholder}
      </div>

      <input
        {...props.input}
        className={inputClassName}
        type={props.input.type}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="new-password"
      />
    </div>
  );
}

export default Input;
