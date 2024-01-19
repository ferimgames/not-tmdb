"use client";
import { Box, Grid } from "@mui/material";
import MediaCard from "./MediaCard";
import { MediaElement } from "@/types/MediaElement";
import { motion } from "framer-motion";

interface Props {
  list: MediaElement[];
}

const MediaList: React.FC<Props> = ({ list }) => {
  return (
    <Grid spacing={1} container sx={{alignContent:"center"}} >
      {list.map((element) => (
        <Grid xs={2} item key={element.id}>
          <MediaCard
            img={element.img}
            title={element.title}
            rating={element.rating}
            url={element.url}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaList;
