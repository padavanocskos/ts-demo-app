import React, { FC, useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  GridRowSelectionModel,
  GridEventListener,
} from "@mui/x-data-grid";
import axios from "axios";
import { useQuery } from "react-query";
import { paramsSerializer } from "../../../utils/paramsSerializer";
import {
  Box,
  Button,
  Card,
  FormLabel,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import ContactForm from "../../Partners/Contacts/Forms/ContactForm";
import { SearchProvider } from "../../Partners/Contacts/Forms/Search/SearchContext";
import GridSearchbar from "../../Partners/Contacts/Forms/Search/GridSearchbar";
import { useNavigate } from "react-router-dom";

interface CrudModuleProps {
  moduleName: string;
}

const CrudModule: FC<CrudModuleProps> = ({ moduleName }) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [queryOptions, setQueryOptions] = useState({});
  const handleSortChange = (sortModel: GridSortModel) => {
    setQueryOptions({ ...queryOptions, sortModel: { ...sortModel } });
  };

  const getRows = async () => {
    const response = await axios
      .get(`http://localhost:3000/api/v1/${moduleName}`, {
        params: { paginationModel, ...queryOptions, columns: columns },
        paramsSerializer: paramsSerializer,
      })
      .catch((error) => console.log(error))
      .then((response) => {
        return response;
      });
    return response?.data;
  };

  const handleFilterChange = (filterModel: GridFilterModel) => {
    setQueryOptions({ ...queryOptions, filterModel: { ...filterModel } });
  };

  const handlePaginationChange = useCallback((paginationModel: any) => {
    setPaginationModel(paginationModel);
  }, []);

  const { data, error, isLoading } = useQuery(
    ["contactsData", { ...paginationModel, ...queryOptions }],
    getRows
  );

  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  const getFieldsMetadata = async () => {
    const result = await axios
      .get(`http://localhost:3000/api/v1/contacts/fields_meta_data`)
      .catch((error) => console.log(error))
      .then((response) => {
        return response;
      });
    return result;
  };

  const {
    data: almafa,
    isLoading: almafaIsLoading,
    error: fieldDefsError,
  } = useQuery(["fieldsMetadata"], getFieldsMetadata);

  const [fieldsMetadata, setFieldsMetadata] = useState({});

  useEffect(() => {
    let a = [];
    let b = [];

    almafa?.data.field_defs.map((item) => {
      a.push({ field: item.name, headerName: item.label });
      b.push({ id: item.name, label: item.label, name: item.name });
    });
    if (!almafaIsLoading) {
      setColumns(a);
      setFieldsMetadata(b);
    }
  }, [almafa, almafaIsLoading]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchFields = [
    { field: "first_name", simple: true, advanced: true, type: "string" },
    { field: "last_name", simple: true, advanced: true, type: "string" },
    { field: "middle_name", simple: false, advanced: true, type: "string" },
    { field: "email", simple: true, advanced: true, type: "string" },
    { field: "age", simple: true, advanced: true, type: "number" },
    { field: "birthdate", simple: true, advanced: true, type: "date" },
    { field: "phone_1", simple: false, advanced: true, type: "string" },
    { field: "phone_2", simple: false, advanced: false, type: "string" },
    { field: "mobile_1", simple: false, advanced: true, type: "string" },
    { field: "mobile_2", simple: false, advanced: false, type: "string" },
    { field: "created_at", simple: true, advanced: true, type: "datetime" },
    { field: "updated_at", simple: false, advanced: true, type: "datetime" },
  ];

  const navigate = useNavigate();

  const handleEvent: GridEventListener<"rowDoubleClick"> = (
    params,
    event,
    details
  ) => {
    console.log("PARAMS: ", params);
    console.log("DETAILS: ", details);
    navigate(`/partners/contact/${params.id}`);
    // navigate(`/`);
  };

  const [searchbarIsVisible, setSearchbarIsVisible] = useState<boolean>(false);

  // TODO: add loader to initial state, when table data is loading
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ContactForm fields={fieldsMetadata} />
      </Modal>
      <Typography variant="h3" gutterBottom>
        {`${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}`}
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "20px",
            "& svg": {
              m: 1,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <FormLabel>Search Form</FormLabel>
            <Switch
              checked={searchbarIsVisible}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchbarIsVisible(event.target.checked);
              }}
            />
          </div>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ margin: "8px" }}
          >
            Add
          </Button>
          <Button variant="contained" color="error" sx={{ margin: "8px" }}>
            Delete
          </Button>
        </Card>
        <SearchProvider>
          <GridSearchbar
            searchbarIsVisible={searchbarIsVisible}
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
            fieldDefs={searchFields}
          />
        </SearchProvider>
        <DataGrid
          rows={data?.rows || []}
          columns={columns}
          rowCount={data?.totalRows || 0}
          loading={isLoading}
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          sortingMode="server"
          onSortModelChange={handleSortChange}
          filterMode="server"
          onFilterModelChange={handleFilterChange}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) =>
            setRowSelectionModel(newSelectionModel)
          }
          onRowDoubleClick={handleEvent}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
    </>
  );
};

export default CrudModule;
