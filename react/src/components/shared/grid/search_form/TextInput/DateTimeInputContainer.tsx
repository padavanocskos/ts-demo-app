import { Box, FormControl, SelectChangeEvent } from "@mui/material";
import { FC, useEffect } from "react";
import useSearch from "../../../../Partners/Contacts/Forms/Search/SearchContext";
import { subscribe } from "../../../../Partners/Contacts/Events/customEvent";
import { IGridSearchFormInputProps } from "../IGridSearchFormInputProps";
import NumericOperatorEnum from "./types/NumericOperatorEnum";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/hu";
import GridSearchFormNumericInputOperatorSelect from "./NumericInputOperatorSelect";
import useFieldOperator from "../hooks/field_operator";
import useDateFieldValue from "../hooks/date_field_value";

const DateTimeInputContainer: FC<IGridSearchFormInputProps> = (props) => {
  const {
    id = "",
    name = "",
    label = "",
    showOperator = true,
    ...restProps
  } = props;
  const { addToSearch: dispatchAddToSearch } = useSearch();
  const {
    value: fieldValue,
    setValue: setFieldValue,
    reset: resetFieldValue,
  } = useDateFieldValue();
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hu">
        <Box
          sx={{
            display: "inline-flex",
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
            <DateTimePicker
              id={field.id}
              name={field.name}
              label={field.label}
              value={fieldValue}
              onChange={(newValue) => setFieldValue(newValue.toString())}
              disableFuture={true}
              clearable={false}
              // sx={{ width: "10em" }}
              componentsProps={{
                actionBar: {
                  actions: ["clear", "cancel", "today"],
                },
              }}
            />
            <GridSearchFormNumericInputOperatorSelect
              id={`${field.id}_operator_select`}
              name={`${name}_operator_select`}
              label="operator"
              value={fieldOperator}
              handleOnSelect={(event: SelectChangeEvent) => {
                handleOperatorChange(event);
              }}
            />
          </FormControl>
        </Box>
      </LocalizationProvider>
    );
  };
  return <>{renderInputField({ id, name, label })}</>;
};

export default DateTimeInputContainer;
