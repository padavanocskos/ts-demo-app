import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Switch,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import GridSearchFormAdvancedTextInputGroup from "../../../../shared/grid/search_form/TextInput/GridSearchFormAdvancedTextInputGroup";
import {
  GridFilterModel,
  GridLogicOperator,
  GridFilterItem,
} from "@mui/x-data-grid";
import SearchForm from "./SearchForm";
import useSearch from "./SearchContext";
import { publish } from "../../Events/customEvent";

const GridSearchbar: FC = ({
  searchbarIsVisible = false,
  queryOptions,
  setQueryOptions = (f) => f,
  fieldDefs = [],
}) => {
  const isVisible = searchbarIsVisible;
  const [advancedChecked, setAdvancedChecked] = useState<boolean>(false);
  const advancedSearchInputStyle = {
    variant: "standard",
    sx: { display: "flex", flexDirection: "row", gap: "1em" },
  };
  const filterModelInitial = {
    items: [],
    logicOperator: GridLogicOperator.And,
  };
  const [gridFilterModel, setGridFilterModel] =
    useState<GridFilterModel>(filterModelInitial);
  const handleClear = () => {
    resetSearchContextState();
  };
  const handleSearch = (
    id: string,
    name: string,
    value: string,
    logicalOperator: string
  ) => {
    addSearchItemToGridFilterModel({
      id: id,
      field: name,
      value: value,
      operator: logicalOperator,
    });
    setQueryOptions({ ...queryOptions, filterModel: { ...gridFilterModel } });
  };
  const addSearchItemToGridFilterModel = (item: GridFilterItem) => {
    let change = false;
    gridFilterModel.items.forEach((element, index) => {
      if (element.id === item.id) {
        gridFilterModel.items[index] = item;
        change = true;
        return;
      }
    });

    if (change === false) {
      gridFilterModel.items.push(item);
    }
    setGridFilterModel({ ...gridFilterModel });
  };

  const {
    fields: searchContextState,
    flag: searchContextFlag,
    setFlag: setSearchContextFlag,
    resetSearchState: resetSearchContextState,
  } = useSearch();

  const handleAdvancedModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetSearchContextState();
    setAdvancedChecked(event.target.checked);
  };

  useEffect(() => {
    const searchItems = Object.entries(searchContextState.fields);
    console.log(searchContextState);
    if (searchItems.length === 0 && searchContextFlag === false) {
      publish("clearSearchContextFields");
      setGridFilterModel(filterModelInitial);
      setSearchContextFlag(true);
    } else {
      searchItems.forEach((item) => {
        const field = item[1];
        addSearchItemToGridFilterModel({
          id: field.id,
          field: field.name,
          value: field.value,
          operator: field.operator,
        });
      });
    }
    setQueryOptions({ ...queryOptions, filterModel: { ...gridFilterModel } });
  }, [searchContextState, searchContextFlag]);

  return (
    <>
      {isVisible && (
        <Card id="search">
          <Box>
            <FormControl
              orientation="horizontal"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1em",
                padding: "1em",
              }}
            >
              <Button variant="outlined" color="error" onClick={handleClear}>
                Clear
              </Button>
              <div style={{ marginLeft: "auto" }}>
                <FormLabel>Advanced</FormLabel>
                <Switch
                  checked={advancedChecked}
                  onChange={(event) => {
                    handleAdvancedModeChange(event);
                  }}
                />
              </div>
            </FormControl>
            <FormControl
              orientation="horizontal"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: "1em",
                gap: "1em",
              }}
            >
              {advancedChecked ? (
                <>
                  {/* <GridSearchFormTextInput name="first_name" label="First name" handleSearchModelChange={handleSearch} /> */}
                  <GridSearchFormAdvancedTextInputGroup
                    name="first_name"
                    label="First name"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="middle_name"
                    label="Middle name"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="last_name"
                    label="Last name"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="email"
                    label="Email"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="mobile1"
                    label="Mobile 1"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="mobile2"
                    label="Mobile 2"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="phone1"
                    label="Phone 1"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                  <GridSearchFormAdvancedTextInputGroup
                    name="phone2"
                    label="Phone 2"
                    handleOnChange={handleSearch}
                    {...advancedSearchInputStyle}
                  />
                </>
              ) : (
                <>
                  <SearchForm fields={fieldDefs} />
                </>
              )}
            </FormControl>
          </Box>
        </Card>
      )}
    </>
  );
};

export default GridSearchbar;
