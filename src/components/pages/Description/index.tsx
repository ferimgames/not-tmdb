"use client";
import { Box, Typography } from "@mui/material";
import Hero from "./components/Hero";
import { MediaSources } from "@/types/MediaSource";
import axios from "axios";
import { useState, useEffect } from "react";
import MediaList from "@/components/MediaList";
import CastList from "./components/CastList";

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
    highlightCrew: { id: number; name: string; job?: string }[];
    genres: { id: number; name: string }[];
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
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
  }, [media, mediaInfo.id]);

  return (
    <Box width={"100%"}>
      <Box sx={{ mb: 5 }}>
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
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ ml: 1, mb: 1 }}>
          Cast
        </Typography>
        <CastList cast={mediaInfo.cast} />
      </Box>
      {itemsList.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ ml: 1, mb: 1 }}>
            Similar {media === "tv" ? "Series" : "Movies"}
          </Typography>
          <MediaList list={itemsList} />
        </Box>
      )}
    </Box>
  );
};

export default DescriptionPage;
