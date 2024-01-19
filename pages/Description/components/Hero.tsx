"use client";
import CircularRating from "@/components/UI/CircularRating";
import { Box, Card, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

interface Props {
  title: string;
  overview?: string;
  tagline?: string;
  release_date: string;
  highlightCrew: { name: string; job?: string }[];
  genres: {}[];
  rating: number;
  img: string;
  backdrop_path: string;
}

const Hero: React.FC<Props> = ({
  title,
  overview,
  tagline,
  release_date,
  highlightCrew,
  rating,
  genres,
  img,
  backdrop_path,
}) => {
  const year_of_release = release_date.split("-")[0];

  const renderHighlytghCrew = highlightCrew.map((crewPerson, index) => (
    <Box sx={{ display: "inline-block", mr: 2 }} key={index}>
      <Typography variant="body1">{crewPerson.name}</Typography>
      <Typography variant="body2">
        {crewPerson.job ? crewPerson.job : "Created by"}
      </Typography>
    </Box>
  ));

  return (
    <Box
      sx={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat;",
        pb: 2,
        pt: 2,
        mt: 2,
        borderRadius: 2,
        boxShadow:
          "0px 1px 20px 2px rgba(0,0,0,0.2), 0px 5px 18px 6px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          backgroundColor: "#0000006c",
          borderRadius: 2,
          boxShadow:
            "0px 1px 20px 2px rgba(0,0,0,0.2), 0px 5px 18px 6px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Grid item xs={4}>
          <Card
            sx={{
              height: 450,
              width: 300,
              position: "relative",
            }}
          >
            <img src={img} width="100%" title={title} />
            <CircularRating
              value={rating * 10}
              sx={{ color: red[700] }}
              containerprops={{ position: "absolute", bottom: 10, right: 10 }}
            />
          </Card>
        </Grid>
        <Grid item xs={8} color={"white"}>
          <Typography variant="h2" component="h1">
            {title} ({year_of_release})
          </Typography>
          {tagline && (
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              {tagline}
            </Typography>
          )}
          <Typography variant="h5">Overview</Typography>
          <Typography variant="body1">
            {overview
              ? overview
              : "We don't have an overview translated in English. Help us expand our database by adding one."}
          </Typography>
          <Box sx={{ mt: 2 }}>{renderHighlytghCrew}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
