import * as React from "react";
import DescriptionPage from "pages/Description";
import { getMedaInfo } from "pages/api/media/[slug]";
import { MediaSources } from "@/types/MediaSource";

export const metadata = {
  title: "Description page",
  description: "Amazing description",
};

export default async function Page({
  params,
}: {
  params: { media: MediaSources; id: number };
}) {
  const {id, media} = params;
  const mediaInfo = await getMedaInfo(id, "en-US", media);
  
  return <DescriptionPage mediaInfo= {mediaInfo} media={media}/>;
}
