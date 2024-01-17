"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MediaSources } from "@/types/MediaSource";
import { MediaElement } from "@/types/MediaElement";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MediaList from "@/components/MediaList";
import Hero from "./components/Hero";

interface Props {
  list: MediaElement[];
}

const HomePage: React.FC<Props> = ({ list }) => {
  const [source, setSource] = useState<MediaSources>("movies");
  const [itemsList, setItemsList] = useState(list);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      if (firstTime) return;

      const newList = await axios.post("/api/media/fetchMediaList", {
        language: "en-US",
        page: "1",
        source,
      });
      setItemsList(newList.data.result);
    };

    fetchList();
  }, [source]);

  const onClickSourceHanlder = () => {
    setFirstTime(false);
    setSource("tv");
  };
  return (
    <Box maxWidth={1600}>
      <Hero />
      <Box>
        <Button onClick={onClickSourceHanlder}>TV</Button>
        <MediaList list={itemsList} />
      </Box>
    </Box>
  );
};

export default HomePage;
