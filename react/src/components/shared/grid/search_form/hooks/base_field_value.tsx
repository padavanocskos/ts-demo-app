import { useCallback, useState } from "react";

const useBaseFieldValue = () => {
  const [value, setValue] = useState<string>("");
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    // Megnezni, hogy kell-e a deps
    []
  );
  return {
    value,
    setValue,
    handleOnChange,
    reset: () => setValue(""),
  };
};

export default useBaseFieldValue;
