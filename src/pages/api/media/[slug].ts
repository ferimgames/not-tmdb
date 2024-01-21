import { MediaElement } from "@/types/MediaElement";
import { MediaSources } from "@/types/MediaSource";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const { language, page, source, id } = req.body;

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
        const result = await getMedaInfo(id, language, source);
        res.status(200).json({ result });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "getSimilarMedia":
      try {
        const result = await getSimilarMedia(id, language, page, source);
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

  return parseMediaListData(res.data.results, source);
}

export async function getSimilarMedia(
  id: number,
  language: string,
  page: string,
  source: MediaSources
): Promise<MediaElement[]> {
  const URI = `language=${language}&page=${page}`;
  const apiUrl =
    source === "movies"
      ? `https://api.themoviedb.org/3/movie/${id}/similar?`
      : `https://api.themoviedb.org/3/tv/${id}/similar?`;

  const res = await axios(apiUrl + URI, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.KEY_TMDB}`, //On a normal app .env should be on the .gitignore list
    },
  });

  return parseMediaListData(res.data.results, source);
}

export async function getMedaInfo(
  id: number,
  language: string,
  source: MediaSources
) {
  const URI = `language=${language}`;
  const apiUrl =
    source === "movies"
      ? `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&${URI}`
      : `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&${URI}`;

  const res = await axios(apiUrl + URI, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.KEY_TMDB}`, //On a normal app .env should be on the .gitignore list
    },
  });
  let highlightCrew = [];
  if (source === "movies") {
    const highlightJobs = ["Director", "Novel", "Screenplay"];
    highlightCrew = res.data.credits.crew.filter(
      (crewEmber: { job: string }) => {
        return highlightJobs.includes(crewEmber.job);
      }
    );
  } else {
    highlightCrew = res.data.created_by;
  }

  return {
    id: res.data.id,
    title: res.data.title ? res.data.title : res.data.name,
    overview: res.data.overview,
    tagline: res.data.tagline,
    rating: res.data.vote_average,
    number_votes: res.data.vote_count,
    img: `https://image.tmdb.org/t/p/original/${res.data.poster_path}`,
    backdrop: `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`,
    genres: res.data.genres,
    release_date: res.data.first_air_date
      ? res.data.first_air_date
      : res.data.release_date,
    highlightCrew,
    created_by: res.data.created_by,
    cast: res.data.credits.cast,
  };
}

const parseMediaListData = (
  data: {
    id: number;
    name: string;
    title?: string;
    poster_path: string;
    vote_average: number;
  }[],
  source: MediaSources
): MediaElement[] => {
  const cleanData = data.filter((media) => {
    return media.poster_path !== null;
  });

  const parseData = cleanData.map((media) => ({
    id: media.id,
    title: media.title ? media.title : media.name,
    img: `https://image.tmdb.org/t/p/original/${media.poster_path}`,
    rating: media.vote_average,
    url: `/${source}/${media.id}`,
  }));

  return parseData;
};
