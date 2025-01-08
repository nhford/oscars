// import Image from "next/image";
// import Film from "./film";
import Gallery from "./gallery";
import Title from "./title";
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
        <Title />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 bg-gray-100">
            <Heading2 text="How it Works" />
            <Heading2 text="Movies Watched This Year" />
            <Gallery movies={movies} path={"film"} />
          </div>
          <div className="w-full md:w-1/2 p-4 bg-gray-100">
            <Heading2 text="2024 Awards" />
          </div>
        </div>
        <Heading2 text="The Categories" />
        {/* reveal winner -> have button to show winners or just show nominees */}
        <Heading2 text="The Nominees" />
        <Heading2 text="H3: Best Supporting Actor" />
        <Gallery
          movies={movies.filter((film) => film.supporting != null)}
          path="supp"
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
