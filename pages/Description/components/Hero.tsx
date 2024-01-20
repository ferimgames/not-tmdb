"use client";
import CircularRating from "@/components/UI/CircularRating";
import { Box, Card, Grid, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import Image from "next/image";

interface Props {
  title: string;
  overview?: string;
  tagline?: string;
  release_date: string;
  rating: number;
  img: string;
  backdrop_path: string;
  highlightCrew: { id: number; name: string; job?: string }[];
  genres: { id: number; name: string }[];
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

  const renderHighlytghCrew = highlightCrew.map((crewPerson) => (
    <Box
      sx={{ display: "inline-block", mr: 2 }}
      key={`crew_${crewPerson.job}_${crewPerson.id}`}
    >
      <Typography variant="body1">{crewPerson.name}</Typography>
      <Typography variant="body2">
        {crewPerson.job ? crewPerson.job : "Created by"}
      </Typography>
    </Box>
  ));

  const renderGenres = genres.map((genre) => (
    <Card
      key={`genre_${genre.id}`}
      sx={{ display: "inline-block", mr: 1, p: 0.5 }}
    >
      <Typography variant="body2" component="span" color="text.secondary">
        {genre.name}
      </Typography>
    </Card>
  ));

  return (
    <Box
      sx={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat;",
        backgroundPosition: { xs: "center", md: "initial" },
        pb: { md: 2, xs: 0 },
        pt: { md: 2, xs: 0 },
        mt: { md: 2, xs: 0 },
        borderRadius: 2,
        boxShadow: shadows[10],
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
          p: { md: 0, xs: 2 },
          boxShadow: shadows[10],
        }}
      >
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              position: "relative",
              height: { md: 450, xs: 270 },
              width: { md: 300, xs: 180 },
              m: { xs: "auto", md: "initial" },
            }}
          >
            <Image
              src={img}
              title={title}
              alt="Poster"
              width={0}
              height={0}
              sizes="10vm"
              style={{ width: "100%", height: "auto" }}
            />
            <CircularRating
              value={rating * 10}
              sx={{ color: "secondary.main" }}
              containerprops={{ position: "absolute", bottom: 10, right: 10 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box ml={2}>
            <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
              {title} ({year_of_release})
            </Typography>
            {tagline && (
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 1 }}>
                {tagline}
              </Typography>
            )}
            <Box>{renderGenres}</Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Overview
            </Typography>
            <Typography variant="body1">
              {overview
                ? overview
                : "We don't have an overview translated in English. Help us expand our database by adding one."}
            </Typography>
            <Box sx={{ mt: 2 }}>{renderHighlytghCrew}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
