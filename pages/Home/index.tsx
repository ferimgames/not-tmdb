"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MediaSources } from "@/types/MediaSource";
import { MediaElement } from "@/types/MediaElement";
import Box from "@mui/material/Box";
import MediaList from "@/components/MediaList";
import Hero from "./components/Hero";

interface Props {
  list: MediaElement[];
}

const HomePage: React.FC<Props> = ({ list }) => {
  const [source, setSource] = useState<MediaSources>("movies");
  const [itemsList, setItemsList] = useState(list);
  const [firstTime, setFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      if (firstTime) return;
      setIsLoading(true);
      const newList = await axios
        .post("/api/media/fetchMediaList", {
          language: "en-US",
          page: "1",
          source,
        })
        .finally(() => {
          setIsLoading(false);
        });
      setItemsList(newList.data.result);
    };

    fetchList();
  }, [source]);

  const onClickSourceHanlder = () => {
    setFirstTime(false);
    if (source === "movies") {
      setSource("tv");
    } else {
      setSource("movies");
    }
  };
  return (
    <Box maxWidth={1600}>
      <Hero
        onClickSourceHanlder={onClickSourceHanlder}
        source={source}
        isLoading={isLoading}
      />
      <Box>
        <MediaList list={itemsList} />
      </Box>
    </Box>
  );
};

export default HomePage;
