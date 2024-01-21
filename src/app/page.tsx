import * as React from "react";
import { MediaElement } from "@/types/MediaElement";
import { fetchMediaList } from "../../pages/api/media/[slug]";
import HomePage from "../../pages/Home";

export const metadata = {
  title: "Movies for me",
  description: "What do you want to see?",
};

export default async function Page() {
  const mediaList = (await fetchMediaList(
    "en-US",
    "1",
    "movies"
  )) as MediaElement[];

  return <HomePage list={mediaList} />;
}
