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
    <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl my-2 p-1">
      {text}
    </h2>
  );
}

function Category({ title }: { title: string }) {
  return (
    <p className="text-base text-center text-gray-800 md:text-lg lg:text-xl p-1">
      {title}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <Title />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-[20px] bg-gray-100">
            <Heading2 text="How it Works" />
            <div className="left_container">
              <p className="text-base text-justify text-gray-800 md:text-lg lg:text-xl p-1">
                Instead of giving awards to the best of cinema <i>released</i>{" "}
                in 2024, the Noah Oscars considers those films I <i>watched</i>{" "}
                in 2024, regardless of their theatrical release year. While the
                Oscars has twenty categories most of which you can skip through,
                the Noah Oscars is mindful of its audience&apos;s attention span
                and gives out only five key awards.
              </p>
              <h3 className="text-lg font-bold text-center text-gray-800 md:text-1.5xl lg:text-2xl m-1 p-1">
                The Categories
              </h3>
              <>
                {[
                  "Best Supporting Actor",
                  "Best Actor",
                  "Best Scene",
                  "Best Ending",
                  "Best Movie",
                ].map((x, i) => (
                  <Category key={i} title={x} />
                ))}
              </>
              <h3 className="text-lg font-bold text-center text-gray-800 md:text-1.5xl lg:text-2xl m-1 p-1">
                Movies I&apos;ve Watched This Year
              </h3>
              <Gallery movies={movies} path={"film"} />
            </div>
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
