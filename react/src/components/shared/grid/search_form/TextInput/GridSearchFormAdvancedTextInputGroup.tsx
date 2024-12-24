import { FC, useEffect, useState } from "react";
import GridSearchFormTextInputOperatorSelect from "./GridSearchFormTextInputOperatorSelect";
import GridSearchFormTextInputOperatorEnum from "./GridSearchFormTextInputOperatorEnum";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import { IGridSearchFormAdvancedSelectProps } from "../IGridSearchFormAdvancedSelectProps";
import { IGridSearchFormInputProps } from "../IGridSearchFormInputProps";
import GridSearchFormTextInput from "./GridSearchFormTextInput";
import useSearch from "../../../../Partners/Contacts/Forms/Search/SearchContext";
import { subscribe } from "../../../../Partners/Contacts/Events/customEvent";

const GridSearchFormAdvancedTextInputGroup: FC<
  IGridSearchFormAdvancedSelectProps & IGridSearchFormInputProps
> = (props) => {
  const { name = "", label = "", ...restProps } = props;
  const [inputId, inputName] = Array(2).fill(`${name}`);
  const [searchText, setSearchText] = useState<string>("");
  const stateInitialValue = {
    isEmpty: false,
    isNotEmpty: false,
    inputDisabled: false,
    selectDisabled: false,
  };
  const [state, setState] = useState(stateInitialValue);
  const { addToSearch: dispatchAddToSearch } = useSearch();
  const [selectedOperator, setSelectedOperator] =
    useState<GridSearchFormTextInputOperatorEnum>(
      GridSearchFormTextInputOperatorEnum.Contains
    );
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedOperator(event.target.value);
  };

  useEffect(() => {
    subscribe("clearSearchContextFields", () => {
      setSearchText("");
      setState(stateInitialValue);
    });
    const timeoutId = setTimeout(() => {
      dispatchAddToSearch({
        id: inputId,
        name: inputName,
        value: searchText,
        operator: selectedOperator,
      });
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [searchText, selectedOperator]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText("");
    const specialSearchValue = event.target.checked ? 1 : "";
    dispatchAddToSearch({
      id: inputId,
      name: inputName,
      value: specialSearchValue,
      operator: event.target.name,
    });
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (state.isEmpty || state.isNotEmpty) {
      setState({ ...state, inputDisabled: true, selectDisabled: true });
    } else {
      setState({ ...state, inputDisabled: false, selectDisabled: false });
    }
  }, [state.isEmpty, state.isNotEmpty]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width: "240px",
          border: "1px solid gray",
          borderRadius: "5px",
          direction: "ltr",
          padding: "1rem",
        }}
      >
        <FormControl {...restProps}>
          <GridSearchFormTextInput
            id={inputId}
            name={inputName}
            label={label}
            handleOnChange={handleSearchTextChange}
            value={searchText}
            disabled={state.inputDisabled}
            sx={{ width: "10em" }}
          />
          <GridSearchFormTextInputOperatorSelect
            id={`${inputId}_operator_select`}
            name={`${name}_operator_select`}
            label="operator"
            value={selectedOperator}
            handleOnSelect={handleSelectChange}
            disabled={state.selectDisabled}
          />
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
  );
};

export default GridSearchFormAdvancedTextInputGroup;
