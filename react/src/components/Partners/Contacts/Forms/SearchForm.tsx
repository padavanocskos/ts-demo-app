import { FC, useState } from "react";
import GridSearchFormTextInput from "../../../shared/grid/search_form/GridSearchFormTextInput";
import { TextField } from "@mui/material";

const searchForm: FC = () => {
  const [state, setState] = useState({
    first_name: {},
    last_name: {},
    email: {},
    mobile_1: {},
    phone_1: {}
  })

  return <>
    <GridSearchFormTextInput name="first_name" label="First name" value={state.first_name} onChange={} />
    <GridSearchFormTextInput name="last_name" label="Last name" handleOnChange={handleSearch} />
    <TextField label="Email" />
    <TextField label="Mobile 1" />
    <TextField label="Phone 1" />
  </>
}

export default searchForm