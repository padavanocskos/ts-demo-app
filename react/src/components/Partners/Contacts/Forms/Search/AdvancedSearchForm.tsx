import { FC } from "react";
import GridSearchFormAdvancedTextInputGroup from "../../../../shared/grid/search_form/TextInput/GridSearchFormAdvancedTextInputGroup";

const AdvancedSearchForm: FC = ({ fields }) => {
  const advancedSearchInputStyle = {
    variant: "standard",
    sx: { display: "flex", flexDirection: "row", gap: "1em" },
  };
  return (
    <>
      {fields
        .filter((item) => item.advanced === true)
        .map((item: any) => {
          const name = item.field;
          return (
            <GridSearchFormAdvancedTextInputGroup
              name={name}
              label={name
                .replace(/^./, name[0].toUpperCase())
                .split("_")
                .join(" ")}
              {...advancedSearchInputStyle}
            />
          );
        })}
    </>
  );
};

export default AdvancedSearchForm;
