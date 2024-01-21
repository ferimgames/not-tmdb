import * as React from "react";
import DescriptionPage from "pages/Description";
import { getMedaInfo } from "pages/api/media/[slug]";
import { MediaSources } from "@/types/MediaSource";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { media: MediaSources; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { id, media } = params;
  const mediaInfo = await getMedaInfo(id, "en-US", media);
  return {
    title: mediaInfo.title,
    description: mediaInfo.overview,
  };
}

export default async function Page({
  params,
}: {
  params: { media: MediaSources; id: number };
}) {
  const { id, media } = params;
  const mediaInfo = await getMedaInfo(id, "en-US", media);

  return <DescriptionPage mediaInfo={mediaInfo} media={media} />;
}
