import { ChangeEvent, FC, useEffect } from "react";
import useFieldsState from "../../../../shared/grid/search_form/hooks/fields_state";
import useSearch from "./SearchContext";
import GridSearchFormTextInput from "../../../../shared/grid/search_form/TextInput/GridSearchFormTextInput";
import SearchItem from "../../../../shared/grid/search_form/objects/SearchItemObject";

// KERESEST AT KELL NEZNI, HOGYAN MUKODIK. ES EGYSEGES FORMARA KELL HOZNI. REFACTORALNI KELL.
const SearchForm: FC = ({ fields, onFieldsChange }) => {
  // const { addToSearch } = useSearch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // addToSearch({name: name, value: value})
    onFieldsChange({ ...fields, [name]: new (SearchItem as any)(value) })
  }

  // useEffect(() => {
  //   console.log("STATE:", fields)
  //   // itt elcsattintom a keresest
  // }, [fields])

  return <>
      { Object.entries(fields).map((item) => {
        const name = item[0]
        return <GridSearchFormTextInput
          id={name}
          name={name}
          label={name.replace(/^./, name[0].toUpperCase()).split('_').join(' ')}
          value={fields[name].value}
          handleOnChange={handleChange} />
      }) }
  </>
}

export default SearchForm