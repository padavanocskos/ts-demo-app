import { FC, useEffect, useState } from "react";
import GridSearchFormTextInputOperatorSelect from "./GridSearchFormTextInputOperatorSelect";
import GridSearchFormTextInputOperatorEnum from "./GridSearchFormTextInputOperatorEnum";
import { Box, Checkbox, FormControl, FormControlLabel, SelectChangeEvent } from "@mui/material";
import { IGridSearchFormAdvancedSelectProps } from "../IGridSearchFormAdvancedSelectProps";
import { IGridSearchFormInputProps } from "../IGridSearchFormInputProps";
import GridSearchFormTextInput from "./GridSearchFormTextInput";

const GridSearchFormAdvancedTextInputGroup: FC<IGridSearchFormAdvancedSelectProps & IGridSearchFormInputProps> = (props) => {
  const { name = '', label = '', handleOnChange = f => f, ...restProps } = props
  const [ inputId, inputName ] = Array(2).fill(`${name}`)
  const [searchText, setSearchText] = useState<string>('')
  const [state, setState] = useState({ isEmpty: false, isNotEmpty: false, inputDisabled: false, selectDisabled: false })
  const [selectedOperator, setSelectedOperator] = useState<GridSearchFormTextInputOperatorEnum>(GridSearchFormTextInputOperatorEnum.Contains)
  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedOperator(event.target.value)
  }

  useEffect(() => {
    handleOnChange(inputId, inputName, searchText, selectedOperator)
  }, [searchText, selectedOperator])

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText('')
    const specialSearchValue= event.target.checked ? 1 : ''
    handleOnChange(inputId, inputName, specialSearchValue, event.target.name)
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    if (state.isEmpty || state.isNotEmpty) {
      setState({ ...state, inputDisabled: true, selectDisabled: true })
    } else {
      setState({ ...state, inputDisabled: false, selectDisabled: false })
    }
  }, [state.isEmpty, state.isNotEmpty])


  return <>
    {/* <GridSearchFormTextInput id={inputId} name={inputName} label={label} handleOnChange={(id, name, value, operator) => handleSearchTextChange(value)} value={searchText} /> */}
    <Box sx={{ display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // width: "240px",
      border: "1px solid gray",
      borderRadius: "5px",
      direction: "ltr",
      padding: '1rem'
    }}>
      <FormControl  {...restProps} >
        <GridSearchFormTextInput id={inputId} name={inputName} label={label} handleOnChange={handleSearchTextChange} value={searchText} disabled={state.inputDisabled} sx={{ width: '10em' }} />
        <GridSearchFormTextInputOperatorSelect id={`${inputId}_operator_select`} name={`${name}_operator_select`} label="operator" value={selectedOperator} handleOnSelect={handleSelectChange} disabled={state.selectDisabled} />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!state.isEmpty}
              onChange={handleCheckChange}
              name="isEmpty"
              color="primary"
              disabled={state.isNotEmpty}
            />
          }
          label="Blank"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!state.isNotEmpty}
              onChange={handleCheckChange}
              name="isNotEmpty"
              color="primary"
              disabled={state.isEmpty}
            />
          }
          label="Present"
        />
      </FormControl>
    </Box>
  </>
}

export default GridSearchFormAdvancedTextInputGroup