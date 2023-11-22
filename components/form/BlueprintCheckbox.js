import React from 'react';
import { Checkbox } from "@blueprintjs/core";

const FormikBlueprintCheckbox = ({ field, form, ...props }) => {
    return (
        <div style={{ padding: "10px 0" }}>
          <Checkbox
              {...props}
              checked={field.value}
              large={true}
              onChange={(event) => {
                  form.setFieldValue(field.name, event.target.checked);
              }}
          />
        </div>
    );
};

export default FormikBlueprintCheckbox;
