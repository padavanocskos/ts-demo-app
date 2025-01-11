import { TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import useSearch from "../../../../Partners/Contacts/Forms/Search/SearchContext";
import GridSearchFormTextInputOperatorEnum from "./types/TextOperatorEnum";
import { subscribe } from "../../../../Partners/Contacts/Events/customEvent";
import { IGridSearchFormInputProps } from "../IGridSearchFormInputProps";

const GridSearchFormSimpleTextInputContainer: FC<IGridSearchFormInputProps> = (
  props
) => {
  const { id = "", name = "", label = "", ...restProps } = props;
  const { addToSearch: dispatchAddToSearch } = useSearch();
  const [fieldValue, setFieldValue] = useState("");
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  useEffect(() => {
    subscribe("clearSearchContextFields", () => {
      setFieldValue("");
    });
    const timeoutId = setTimeout(() => {
      dispatchAddToSearch({
        id: id,
        name: name,
        value: fieldValue,
        operator: GridSearchFormTextInputOperatorEnum.Contains,
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [fieldValue]);
  return (
    <>
      <TextField
        id={id}
        name={name}
        label={label}
        value={fieldValue}
        onChange={handleOnChange}
        {...restProps}
      />
    </>
  );
};

export default GridSearchFormSimpleTextInputContainer;
