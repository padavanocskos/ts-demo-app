import { useCallback, useState } from "react";
import TextOperatorEnum from "../TextInput/types/TextOperatorEnum";
import NumericOperatorEnum from "../TextInput/types/NumericOperatorEnum";
import { SelectChangeEvent } from "@mui/material";

const useFieldOperator = (
  op: TextOperatorEnum | NumericOperatorEnum | null = null
) => {
  const [operator, setOperator] = useState<string>(op ?? "");
  const handleOnChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
      setOperator(event.target.value);
    },
    // Megnezni, hogy kell-e a deps
    []
  );
  return {
    operator,
    setOperator,
    handleOnChange,
    reset: () => setOperator(""),
  };
};

export default useFieldOperator;
