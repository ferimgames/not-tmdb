import { MediaElement } from "@/types/MediaElement";
import { MediaSources } from "@/types/MediaSource";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Hello");

  const { slug } = req.query;
  const { language, page, source } = req.body;
  console.log(slug);
  console.log(req.method);

  switch (slug) {
    case "fetchMediaList":
      try {
        const result = await fetchMediaList(language, page, source);
        res.status(200).json({ result });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "getMedaInfo":
      try {
        const result = await fetchMediaList(language, page, source);
        res.status(200).json({ result });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      break;
  }
}

export async function fetchMediaList(
  language: string,
  page: string,
  source: MediaSources
): Promise<MediaElement[]> {
  const URI = `language=${language}&page=${page}`;
  const apiUrl =
    source === "movies"
      ? "https://api.themoviedb.org/3/movie/popular?"
      : "https://api.themoviedb.org/3/tv/popular?";

  const res = await axios(apiUrl + URI, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.KEY_TMDB}`, //On a normal app .env should be on the .gitignore list
    },
  });

  const parseData = res.data.results.map(
    (media: {
      id: number;
      original_name?: string;
      title?: string;
      poster_path: string;
      vote_average: number;
    }) => ({
      id: media.id,
      title: media.title ? media.title : media.original_name,
      img: `https://image.tmdb.org/t/p/original/${media.poster_path}`,
      rating: media.vote_average,
      url: `/${source}/${media.id}`,
    })
  );

  return parseData;
}
//'https://api.themoviedb.org/3/movie/753342?language=en-US
export async function getMedaInfo(id: number, language:string, source: MediaSources) {
  const URI = `language=${language}`;
  const apiUrl =
  source === "movies"
    ? `https://api.themoviedb.org/3/movie/${id}?${URI}`
    : `https://api.themoviedb.org/3/tv/${id}?${URI}`;

const res = await axios(apiUrl + URI, {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.KEY_TMDB}`, //On a normal app .env should be on the .gitignore list
  },
});
}
