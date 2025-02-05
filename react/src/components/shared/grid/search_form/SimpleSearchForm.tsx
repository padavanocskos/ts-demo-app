import { FC } from "react";
import TextInputContainer from "./TextInput/TextInputContainer";
import NumberInputContainer from "./TextInput/NumberInputContainer";
import DateInputContainer from "./TextInput/DateInputContainer";
import DateTimeInputContainer from "./TextInput/DateTimeInputContainer";

const SimpleSearchForm: FC = ({ fields }) => {
  const advancedSearchInputStyle = {
    variant: "standard",
    sx: { display: "flex", flexDirection: "row", gap: "1em" },
  };
  return (
    <>
      {fields
        .filter((item) => item.simple === true)
        .map((item: any) => {
          // console.log("ITEM >>", item);
          const name = item.field;
          switch (item.type) {
            case "string":
              return (
                <TextInputContainer
                  id={name}
                  type={item.type}
                  name={name}
                  label={name
                    .replace(/^./, name[0].toUpperCase())
                    .split("_")
                    .join(" ")}
                  showOperator={!item.simple}
                />
              );
            case "number":
              return (
                <NumberInputContainer
                  id={name}
                  type={item.type}
                  name={name}
                  label={name
                    .replace(/^./, name[0].toUpperCase())
                    .split("_")
                    .join(" ")}
                  {...advancedSearchInputStyle}
                />
              );
            case "date":
              return (
                <DateInputContainer
                  id={name}
                  type={item.type}
                  name={name}
                  label={name
                    .replace(/^./, name[0].toUpperCase())
                    .split("_")
                    .join(" ")}
                  {...advancedSearchInputStyle}
                />
              );
            case "datetime":
              return (
                <DateTimeInputContainer
                  id={name}
                  type={item.type}
                  name={name}
                  label={name
                    .replace(/^./, name[0].toUpperCase())
                    .split("_")
                    .join(" ")}
                  {...advancedSearchInputStyle}
                />
              );
            default:
              null;
          }
        })}
    </>
  );
};

export default SimpleSearchForm;
