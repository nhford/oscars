import Image from "next/image";
import data from "../public/input/index.json";

interface MovieData {
  [key: string]: string;
}

const movies: MovieData = data;

interface FilmProps {
  abbrev: string;
}

function Film({ abbrev }: FilmProps) {
  return (
    <Image
      className="film"
      src={`/films/${abbrev}.jpg`}
      alt={movies[abbrev]}
      width={200}
      height={200}
    />
  );
}

export default Film;
