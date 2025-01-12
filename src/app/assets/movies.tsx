import data from "./movies.json";
import { Movie, normalizeTitle } from "../util";

const movies: Movie[] = data.sort((a, b) =>
  normalizeTitle(a.title) < normalizeTitle(b.title) ? -1 : 1
);

const record: Record<string, Movie> = movies.reduce(
  (acc: Record<string, Movie>, film: Movie) => {
    if (acc[film.id]) {
      throw new Error(`Duplicate film ID: ${film.id}`);
    }
    acc[film.id] = film;
    return acc;
  },
  {}
);

export default record;
