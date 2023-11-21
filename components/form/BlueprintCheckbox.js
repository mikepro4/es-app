import React from 'react';
import { Checkbox } from "@blueprintjs/core";

const BlueprintCheckboxWrapper = ({ input, meta, label }) => {

  const handleChange = (event) => {
    // Update the form state
    input.onChange(event.target.checked);
  };
  return (
    <Checkbox
      label={label}
      checked={!!input.value}
      onChange={handleChange}
    />
  );
};

export default BlueprintCheckboxWrapper;
