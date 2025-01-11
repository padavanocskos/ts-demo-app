import { useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const useDateFieldValue = (defaultValue = "") => {
  const defVal = defaultValue ? dayjs(defaultValue) : null;
  const [value, setValue] = useState<Dayjs | null>(defVal);
  const handleOnChange = useCallback(
    (newValue) => {
      setValue(newValue);
    },
    // Megnezni, hogy kell-e a deps
    []
  );
  return {
    value,
    setValue,
    handleOnChange,
    reset: () => setValue(null),
  };
};

export default useDateFieldValue;
