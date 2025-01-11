import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import NumericOperatorEnum from "./types/NumericOperatorEnum";
import { IGridSearchFormAdvancedSelectProps } from "../IGridSearchFormAdvancedSelectProps";
import GeneralOperatorEnum from "./types/GeneralOperatorEnum";

const NumericInputOperatorSelect: FC<IGridSearchFormAdvancedSelectProps> = ({
  name,
  label,
  value = NumericOperatorEnum.GreaterThanEqual,
  disabled = false,
  handleOnSelect = (f: SelectChangeEvent, name: string) => f,
}) => {
  return (
    <>
      <Select
        name={name}
        label={label}
        value={value}
        onChange={(e) => handleOnSelect(e, name)}
        disabled={disabled}
      >
        <MenuItem value={NumericOperatorEnum.Equals}>=</MenuItem>
        <MenuItem value={NumericOperatorEnum.GreaterThan}>{`>`}</MenuItem>
        <MenuItem value={NumericOperatorEnum.GreaterThanEqual}>{`>=`}</MenuItem>
        <MenuItem value={NumericOperatorEnum.LessThan}>{`<`}</MenuItem>
        <MenuItem value={NumericOperatorEnum.LessThanEqual}>{`<=`}</MenuItem>
        <MenuItem value={GeneralOperatorEnum.IsAnyOf}>IsAnyOf</MenuItem>
        <MenuItem value={GeneralOperatorEnum.IsEmpty}>IsEmpty</MenuItem>
        <MenuItem value={GeneralOperatorEnum.IsNotEmpty}>IsNotEmpty</MenuItem>
      </Select>
    </>
  );
};

export default NumericInputOperatorSelect;
