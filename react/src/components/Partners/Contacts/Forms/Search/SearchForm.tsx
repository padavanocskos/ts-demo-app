import { FC } from "react";
import GridSearchFormSimpleTextInputContainer from "../../../../shared/grid/search_form/TextInput/GridSearchFormSimpleTextInputContainer";

const SearchForm: FC = ({ fields }) => {
  return (
    <>
      {fields.map((item: any) => {
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

export default SearchForm;
