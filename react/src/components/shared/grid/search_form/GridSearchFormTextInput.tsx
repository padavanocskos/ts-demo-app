import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import GridSearchFormTextInputOperatorEnum from "./GridSearchFormTextInputOperatorEnum";
import { IGridSearchFormTextInputProps } from "./IGridSearchFormTextInputProps";

const GridSearchFormTextInput: FC<IGridSearchFormTextInputProps> = ({
  id = "",
  name = "",
  label = "",
  value= "",
  logicalOperator = GridSearchFormTextInputOperatorEnum.Contains,
  handleOnChange = f => f
}) => {
  return <>
    <TextField id={id} name={name} label={label} onChange={(event: ChangeEvent) => handleOnChange(id, name, event.target.value, logicalOperator) } />
  </>
}

export default GridSearchFormTextInput