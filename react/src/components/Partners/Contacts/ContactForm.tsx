import { Box, Button, Grid, TextField } from "@mui/material";
import { FC } from "react";

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

function handleSubmit(event) {
  event.preventDefault();

  const fd = new FormData(event.target)
  const data = Object.fromEntries(fd.entries())
  console.log("FORM DATA:", data)
}

const ContactForm: FC = () => {
  return (
    <Box sx={style} component="form" onSubmit={handleSubmit} >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="First name" name='first-name' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Middle name" name='middle-name' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Last name" name='last-name' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" label="Email" name='email' />
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