import { FC } from "react";
import GridSearchFormSimpleTextInputContainer from "../../../../shared/grid/search_form/TextInput/GridSearchFormSimpleTextInputContainer";

const SimpleSearchForm: FC = ({ fields }) => {
  // We need a custom logic that in a kind of custom hook or in other type component, wich will render form fields by data type and search logic
  return (
    <>
      {fields
        .filter((item) => item.simple === true)
        .map((item: any) => {
          console.log("ITEM >>", item)
          const name = item.field;
          return (
            <GridSearchFormSimpleTextInputContainer
              id={name}
              name={name}
              label={name
                .replace(/^./, name[0].toUpperCase())
                .split("_")
                .join(" ")}
            />
          );
        })}
    </>
  );
};

export default SimpleSearchForm;
