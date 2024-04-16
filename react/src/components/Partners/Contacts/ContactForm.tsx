import { Box, Button, Grid, TextField } from "@mui/material";
import { FC } from "react";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from "react-query";
import axios from "axios";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// function handleSubmit(event) {
//   event.preventDefault();

//   const fd = new FormData(event.target)
//   const data = Object.fromEntries(fd.entries())
//   console.log("FORM DATA:", data)
// }

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required'),
  middleName: yup
    .string()
    .required('Middle name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email()
    .required('Email is required')

})

const ContactForm: FC = () => {
  const mutation = useMutation({
    mutationFn: (contact) => {
      let almafa = {}
      Object.keys(contact).map(key => {
        let k = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
        almafa[k] = contact[key]
      })
      console.log(almafa)
      return axios.post(`http://localhost:3000/api/v1/contacts`, almafa)
    }
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phone1: '',
      phone2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({contact: values })
    }
  })

  return (
    <Box sx={style} component="form" onSubmit={formik.handleSubmit} >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField id="firstName" type="text" variant="outlined" label="First name" name='firstName' error={formik.touched.firstName && Boolean(formik.errors.firstName)} value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} helperText={formik.touched.firstName && formik.errors.firstName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id='middleName' name='middleName' variant="outlined" label="Middle name" error={formik.touched.middleName && Boolean(formik.errors.middleName)} value={formik.values.middleName} onChange={formik.handleChange} onBlur={formik.handleBlur} helperText={formik.touched.middleName && formik.errors.middleName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id='lastName' variant="outlined" label="Last name" error={formik.touched.lastName && Boolean(formik.errors.lastName)} value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} name='lastName' helperText={formik.touched.lastName && formik.errors.lastName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id='email' name='email' variant="outlined" error={formik.touched.email && Boolean(formik.errors.email)} label="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} helperText={formik.touched.email && formik.errors.email} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Phone 1" name='phone1' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Phone 2" name='phone2' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Mobile 1" name='mobile1' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Mobile 2" name='mobile2' />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="outlined">Create</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactForm