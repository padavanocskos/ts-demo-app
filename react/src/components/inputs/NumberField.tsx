import React, { FC, useState } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";

interface NumberFieldProps extends BaseTextFieldProps {
  initialValue?: string
}

const NumberField: FC<NumberFieldProps> = ({ initialValue, ...props }) => {
  const [value,setValue] = useState<string>(initialValue || '')
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/

    if (e.target.value === '' || re.test(e.target.value)) {
        setValue(e.target.value)
    }
  }

  return (
    <>
      <TextField onChange={handleOnChange} value={value || initialValue} {...props} />
    </>
  )
};

export default NumberField;