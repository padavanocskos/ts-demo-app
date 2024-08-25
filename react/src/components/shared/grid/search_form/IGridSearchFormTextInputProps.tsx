import { ChangeEvent } from "react";

export interface IGridSearchFormTextInputProps {
  id: string,
  name: string,
  label: string,
  value: string,
  logicalOperator?: string,
  handleOnChange: ((id: string, name: string, value: string, operator: string) => void) | ((event: ChangeEvent) => void),
}