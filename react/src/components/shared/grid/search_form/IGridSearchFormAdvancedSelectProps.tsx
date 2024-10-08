import { SelectChangeEvent } from "@mui/material";

export interface IGridSearchFormAdvancedSelectProps {
  name: string,
  label: string,
  value: string,
  disabled: boolean,
  handleOnSelect: (event: SelectChangeEvent) => void
}