import React, { useRef, useEffect } from 'react';
import { useField } from 'formik';

const FormikTextarea = ({ label, field, ...props }) => {
  // Connects the textarea to Formik's internal state

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scroll height
    }
  }, [field.value]);

  return (
    <div className="textarea-container">
      {label && <label htmlFor={props.id || props.name} className="textarea-label">{label}</label>}
      <textarea 
	  	{...field} 
		{...props}  
		ref={textareaRef} 
		placeholder={props.placeholder}
	/>
    </div>
  );
};

export default FormikTextarea;
