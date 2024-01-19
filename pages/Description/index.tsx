"use client";
import { Box, Typography } from "@mui/material";
import Hero from "./components/Hero";
import { MediaSources } from "@/types/MediaSource";
import axios from "axios";
import { useState, useEffect } from "react";
import MediaList from "@/components/MediaList";

interface Props {
  media: MediaSources;
  mediaInfo: {
    id: number;
    title: string;
    overview?: string;
    tagline?: string;
    img: string;
    backdrop: string;
    rating: number;
    number_votes: number;
    release_date: string;
    genres: {}[];
    credits: {}[];
    highlightCrew: { name: string; job?: string }[];
  };
}
const DescriptionPage: React.FC<Props> = ({ mediaInfo, media }) => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const fetchRelatedMedia = async () => {
      const newList = await axios.post("/api/media/getSimilarMedia", {
        language: "en-US",
        page: "1",
        id: mediaInfo.id,
        source: media,
      });
      setItemsList(newList.data.result);
    };

    fetchRelatedMedia();
  }, []);

  return (
    <Box width={"100%"}>
      <Box sx={{ mb: 10 }}>
        <Hero
          title={mediaInfo.title}
          tagline={mediaInfo.tagline}
          overview={mediaInfo.overview}
          release_date={mediaInfo.release_date}
          rating={mediaInfo.rating}
          img={mediaInfo.img}
          backdrop_path={mediaInfo.backdrop}
          highlightCrew={mediaInfo.highlightCrew}
          genres={mediaInfo.genres}
        />
      </Box>

      <Box>
        <MediaList list={itemsList} />
      </Box>
    </Box>
  );
};

export default DescriptionPage;
