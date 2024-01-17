import { Box, Grid, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Typography variant="h3" component="h1">
            Welcome.
            <br />
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          Amazing IMG
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
