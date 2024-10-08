import { ChangeEvent } from "react";

export interface IGridSearchFormInputProps {
  id: string,
  name: string,
  label: string,
  value: string,
  handleOnChange: (event: ChangeEvent) => void,
}