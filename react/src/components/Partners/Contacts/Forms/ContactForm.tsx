import { Box, Button, Grid, TextField } from "@mui/material";
import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

function camelToSnake(obj) {
  const snakeObj = {};
  for (const key in obj) {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );
    snakeObj[snakeKey] = obj[key];
  }
  return snakeObj;
}

const ContactForm: FC = () => {
  const mutation = useMutation({
    mutationFn: (contact) => {
      return axios.post(
        `http://localhost:3000/api/v1/contacts`,
        camelToSnake(contact)
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone1: "",
      phone2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({ contact: values });
    },
  });

  const fields = [
    { id: "firstName", label: "Firstname", name: "firstName" },
    { id: "middleName", label: "Middlename", name: "middleName" },
    { id: "lastName", label: "Lastname", name: "lastName" },
    { id: "email", label: "Email", name: "email" },
    { id: "phone1", label: "Phone 1", name: "phone1" },
    { id: "phone2", label: "Phone 2", name: "phone2" },
    { id: "mobile1", label: "Mobile 1", name: "mobile1" },
    { id: "mobile2", label: "Mobile 2", name: "mobile2" },
  ];

  return (
    // Rewritten code to address the performance issues
    <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.id}>
            <TextField
              id={field.id}
              key={field.id}
              name={field.name}
              variant="outlined"
              label={field.label}
              error={
                formik.touched[field.name] && Boolean(formik.errors[field.name])
              }
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="outlined">
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
