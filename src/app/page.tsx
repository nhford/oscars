import Image from "next/image";
import Film from "./film";
import Gallery from "./gallery";
import data from "./assets/index.json";

interface MovieData {
  [key: string]: string;
}

const movies: MovieData = data;

export default function Home() {
  return (
    <>
      <Gallery movies={movies} />
    </>
  );
}
