import { SelectChangeEvent } from "@mui/material";

export interface IGridSearchFormAdvancedSelectProps {
  name: string,
  label: string,
  value: string,
  handleOnSelect: (event: SelectChangeEvent) => void
}