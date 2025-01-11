import { FormControl, TextField } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import useSearch from "../../../../Partners/Contacts/Forms/Search/SearchContext";
import { subscribe } from "../../../../Partners/Contacts/Events/customEvent";
import { IGridSearchFormInputProps } from "../IGridSearchFormInputProps";
import "dayjs/locale/hu";
import useBaseFieldValue from "../hooks/base_field_value";
import useFieldOperator from "../hooks/field_operator";
import NumericInputOperatorSelect from "./NumericInputOperatorSelect";
import NumericOperatorEnum from "./types/NumericOperatorEnum";

const NumberInputContainer: FC<IGridSearchFormInputProps> = (props) => {
  const { id = "", name = "", label = "", showOperator = true } = props;
  const { addToSearch: dispatchAddToSearch } = useSearch();
  const {
    value: fieldValue,
    handleOnChange: handleOnChange,
    reset: resetFieldValue,
  } = useBaseFieldValue();
  const { operator: fieldOperator, handleOnChange: handleOperatorChange } =
    useFieldOperator(NumericOperatorEnum.GreaterThanEqual);

  useEffect(() => {
    subscribe("clearSearchContextFields", () => {
      resetFieldValue();
    });
    const timeoutId = setTimeout(() => {
      dispatchAddToSearch({
        id: id,
        name: name,
        value: fieldValue,
        operator: fieldOperator,
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [fieldValue, fieldOperator]);

  const renderInputField = (field = { id, name, label }) => {
    return (
      <FormControl>
        <TextField
          type="text"
          id={field.id}
          name={field.name}
          label={field.label}
          value={fieldValue}
          onChange={handleOnChange}
        />
        {showOperator && (
          <NumericInputOperatorSelect
            name={name}
            label={label}
            value={fieldOperator}
            handleOnSelect={handleOperatorChange}
            disabled={false}
          />
        )}
      </FormControl>
    );
  };
  return <>{renderInputField({ id, name, label })}</>;
};

export default NumberInputContainer;
