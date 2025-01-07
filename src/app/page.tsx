// import Image from "next/image";
// import Film from "./film";
import Gallery from "./gallery";
import data from "./assets/movies.json";
import { Movie, normalizeTitle } from "./util";

const movies: Movie[] = data.sort((a, b) =>
  normalizeTitle(a.title) < normalizeTitle(b.title) ? -1 : 1
);

function Heading2({ text }: { text: string }) {
  return (
    <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl my-2">
      {text}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-5xl font-bold text-center text-white-800 md:text-6xl lg:text-7xl my-4">
          Noah Oscars
        </h1>
        <Heading2 text="How it Works" />
        <Heading2 text="Movies Watched This Year" />
        <Gallery movies={movies} path={"film"} />
        <Heading2 text="The Categories" />
        {/* reveal winner -> have button to show winners or just show nominees */}
        <Heading2 text="The Nominees" />
        <Heading2 text="H3: Best Supporting Actor" />
        <Gallery
          movies={movies.filter((film) => film.supporting != null)}
          path={"film"}
        />
        <Heading2 text="H3: Best Actor" />
        <Gallery
          movies={movies.filter((film) => film.actor != null)}
          path="actor"
        />
        {/* <Heading2 text="H3: Best Scene" />
        <Gallery movies={movies.filter((film) => film.scene != null)} /> */}
        <Heading2 text="H3: Best Ending" />
        <Gallery
          movies={movies.filter((film) => film.ending != null)}
          path="film"
        />
        <Heading2 text="H3: Best Movie" />
        <Gallery
          movies={movies.filter((film) => film.movie != null)}
          path="film"
        />
      </main>
    </>
  );
}
