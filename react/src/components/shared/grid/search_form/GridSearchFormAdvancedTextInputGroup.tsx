import { ChangeEvent, FC, useEffect, useState } from "react";
import GridSearchFormTextInput from "./GridSearchFormTextInput";
import GridSearchFormTextInputOperatorSelect from "./GridSearchFormTextInputOperatorSelect";
import { IGridSearchFormTextInputProps } from "./IGridSearchFormTextInputProps";
import GridSearchFormTextInputOperatorEnum from "./GridSearchFormTextInputOperatorEnum";
import { SelectChangeEvent } from "@mui/material";
import { IGridSearchFormAdvancedSelectProps } from "./IGridSearchFormAdvancedSelectProps";

const GridSearchFormAdvancedTextInputGroup: FC<IGridSearchFormAdvancedSelectProps & IGridSearchFormTextInputProps> = ({
  name,
  label,
  handleOnChange = f => f,
}) => {
  const [ inputId, inputName ] = Array(2).fill(`${name}_input`)
  const [searchText, setSearchText] = useState<string>('')
  const [selectedOperator, setSelectedOperator] = useState<GridSearchFormTextInputOperatorEnum>(GridSearchFormTextInputOperatorEnum.Contains)
  const handleSearchTextChange = (value: string) => {
    setSearchText(value)
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedOperator(event.target.value)
  }

  useEffect(() => {
    handleOnChange(inputId, inputName, searchText, selectedOperator)
  }, [searchText, selectedOperator])

  return <>
    <GridSearchFormTextInput id={inputId} name={inputName} label={label} handleOnChange={(id, name, value, operator) => handleSearchTextChange(value)} />
    <GridSearchFormTextInputOperatorSelect name={`${name}_operator_select`} label="operator" value={selectedOperator} handleOnSelect={handleSelectChange}/>
  </>
}

export default GridSearchFormAdvancedTextInputGroup