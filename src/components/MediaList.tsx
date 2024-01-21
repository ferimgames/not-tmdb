"use client";
import { Grid } from "@mui/material";
import MediaCard from "./MediaCard";
import { MediaElement } from "@/types/MediaElement";

interface Props {
  list: MediaElement[];
}

const MediaList: React.FC<Props> = ({ list }) => {
  return (
    <Grid spacing={1} container sx={{ alignContent: "center" }}>
        {list.map((element) => (
          <Grid lg={2} md={3} sm={4} xs={6} item key={element.id}>
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
