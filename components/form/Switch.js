import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Switch } from "@blueprintjs/core";

const FormikSwitch = ({ name, field, ...props }) => {

    const { setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        const { checked } = event.target;
        setFieldValue(field.name, checked);
    };

    return (
        <div className="switch-container">

            <Switch
                {...field}
                {...props}
                label={props.label}
                checked={field.value}
                onChange={handleChange}
            />

        </div>

    );
};

export default FormikSwitch;
