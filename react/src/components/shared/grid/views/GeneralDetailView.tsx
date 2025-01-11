import { Grid, Paper, Skeleton } from "@mui/material";

const GeneralDetailView = () => {
  return (
    <>
      <Paper>
        <Grid size={5} />
        <Grid size={5}>
          <Skeleton height={14} />
        </Grid>
      </Paper>
    </>
  );
};

export default GeneralDetailView;
