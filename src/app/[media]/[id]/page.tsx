import * as React from "react";
import type { Metadata } from "next";
import DescriptionPage from "@/components/pages/Description";
import { getMedaInfo } from "@/pages/api/media/[slug]";
import { MediaSources } from "@/types/MediaSource";

type Props = {
  params: { media: MediaSources; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
