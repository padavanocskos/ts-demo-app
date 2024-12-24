import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Switch,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  GridFilterModel,
  GridLogicOperator,
  GridFilterItem,
} from "@mui/x-data-grid";
import useSearch from "./SearchContext";
import { publish } from "../../Events/customEvent";
import AdvancedSearchForm from "./AdvancedSearchForm";
import SimpleSearchForm from "./SimpleSearchForm";

interface GridSearchbarProps {
  searchbarIsVisible?: boolean;
  queryOptions: any;
  setQueryOptions: (options: any) => void;
  fieldDefs: any[];
}

const GridSearchbar: FC<GridSearchbarProps> = ({
  searchbarIsVisible = false,
  queryOptions,
  setQueryOptions = (f) => f,
  fieldDefs = [],
}) => {
  const isVisible = searchbarIsVisible;
  const [advancedChecked, setAdvancedChecked] = useState<boolean>(false);
  const filterModelInitial = {
    items: [],
    logicOperator: GridLogicOperator.And,
  };
  const [gridFilterModel, setGridFilterModel] =
    useState<GridFilterModel>(filterModelInitial);
  const handleClear = () => {
    resetSearchContextState();
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
    if (searchItems.length === 0 && searchContextFlag === false) {
      publish("clearSearchContextFields");
      setGridFilterModel(filterModelInitial);
      setSearchContextFlag(true);
    } else {
      searchItems.forEach((item) => {
        const field: GridFilterItem = item[1];
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
                  <AdvancedSearchForm fields={fieldDefs} />
                </>
              ) : (
                <>
                  <SimpleSearchForm fields={fieldDefs} />
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
