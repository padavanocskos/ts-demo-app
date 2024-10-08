import { TextField } from "@mui/material";
import { FC } from "react";
import { IGridSearchFormTextInputProps } from "./IGridSearchFormTextInputProps";

const GridSearchFormTextInput: FC<IGridSearchFormTextInputProps> = (props) => {
  const { id = "", name="", label="", value="", disabled=false, handleOnChange = f => f, ...restProps } = props
  return <>
    <TextField id={id} name={name} label={label} value={value} onChange={handleOnChange} disabled={disabled} {...restProps} />
  </>
}

export default GridSearchFormTextInput