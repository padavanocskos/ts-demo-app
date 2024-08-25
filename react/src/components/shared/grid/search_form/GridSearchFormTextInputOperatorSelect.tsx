import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import GridSearchFormTextInputOperatorEnum from "./GridSearchFormTextInputOperatorEnum";
import { IGridSearchFormAdvancedSelectProps } from "./IGridSearchFormAdvancedSelectProps";

const GridSearchFormTextInputOperatorSelect: FC<IGridSearchFormAdvancedSelectProps> = ({
  name,
  label,
  value = GridSearchFormTextInputOperatorEnum.Contains,
  handleOnSelect = (f: SelectChangeEvent, name: string) => f
}) => {
  return <>
    <Select
        name={name}
        label={label}
        value={value}
        onChange={e => handleOnSelect(e, name)}
    >
      <MenuItem value={GridSearchFormTextInputOperatorEnum.Contains}>Contains</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.StartsWith}>StartsWith</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.EndsWith}>EndsWith</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.Equals}>Equals</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.IsAnyOf}>IsAnyOf</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.IsEmpty}>IsEmpty</MenuItem>
      <MenuItem value={GridSearchFormTextInputOperatorEnum.IsNotEmpty}>IsNotEmpty</MenuItem>
    </Select>
  </>
}

export default GridSearchFormTextInputOperatorSelect