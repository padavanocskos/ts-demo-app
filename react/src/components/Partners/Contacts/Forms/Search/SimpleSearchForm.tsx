import { FC } from "react";
import GridSearchFormSimpleTextInputContainer from "../../../../shared/grid/search_form/TextInput/GridSearchFormSimpleTextInputContainer";

const SimpleSearchForm: FC = ({ fields }) => {
  return (
    <>
      {fields
        .filter((item) => item.simple === true)
        .map((item: any) => {
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
