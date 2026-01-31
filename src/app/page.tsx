"use client";
import React, { useState } from "react";

import record from "./assets/movies";
import Gallery from "./gallery";
import Title from "./title";
import Slideshow from "./slideshow";
import { Movie } from "./util";
import Signature from "./footer";
import YearToggle from "./year_toggle";

const movies: Movie[] = Object.values(record);

function Heading2({ text }: { text: string }) {
  return (
    <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl my-2 lg:my-4 p-1">
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
  const [year, setYear] = useState("2025");
  const numeric_year = year == "All-Time" ? 2025 : parseInt(year);

  return (
    <>
      <main>
        <Title />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:mx-5 mx-0 bg-gray-100 md:rounded-lg">
            <div className="text-center">
              <Heading2 text="How it Works" />
              <div className="text-center p-1">
                <YearToggle
                  year={year}
                  setYear={setYear}
                  options={["2023", "2024", "2025", "All-Time"]}
                />
              </div>
            </div>

            <div className="left_container">
              <p className="text-base text-justify text-gray-800 md:text-lg lg:text-xl mx-2 p-2">
                Instead of giving awards to the best of cinema <i>released</i>{" "}
                in a given year, the Noah Oscars considers those films I{" "}
                <i>watched</i> in said year, regardless of their theatrical
                release year. While the Oscars has twenty categories most of
                which you can skip through, the Noah Oscars is mindful of its
                audience&apos;s attention span and gives out only five key
                awards.
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
              <h3 className="text-lg font-bold text-center text-gray-800 md:text-1.5xl lg:text-2xl m-1 pt-0.5">
                Movies I&apos;ve Watched{" "}
                {year == "All-Time" ? year : "This Year"}
              </h3>
              <Gallery
                year={year}
                movies={movies.filter((movie) =>
                  year == "All-Time" ? true : movie.watched == numeric_year,
                )}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:mx-5 mx-0 md:rounded-lg flex my-4 md:my-6 justify-center place-self-center">
            <div className="bg-gray-100 md:rounded-lg w-full h-[750px] md:h-[900px] lg:h-[1200px]">
              <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl my-2 p-1 md:pt-6">
                {numeric_year} Awards
              </h2>
              <div className="right_container">
                <YearToggle
                  year={year}
                  setYear={setYear}
                  options={["2023", "2024", "2025"]}
                />
                <Slideshow
                  movies={movies.filter(
                    (movie) => movie.watched == numeric_year,
                  )}
                  year={numeric_year}
                />
                <div className="">{/* Controls */}</div>
              </div>
            </div>
          </div>
        </div>
        <Signature />
      </main>
    </>
  );
}
