"use client";

import Film from "./film";
import PropTypes from "prop-types";
import { Movie, normalizeTitle } from "./util";
import ControlledSwitch from "./switch";
import { useState } from "react";

type sortkey = "title" | "rating" | "release";

function Gallery({ movies }: { movies: Movie[] }) {
  const [data, setData] = useState(movies);
  const [hidden, setHidden] = useState(false);
  const [sorted, setSorted] = useState({ key: "title", dir: "desc" });
  const [flipped, setFlipped] = useState(Array(movies.length).fill(false));

  const sortIcon = (key: sortkey) => {
    return sorted.key === key ? (
      sorted.dir === "desc" ? (
        <span className="text-sm md:text-base align-top">↓</span>
      ) : (
        <span className="text-sm md:text-base align-top">↑</span>
      )
    ) : (
      <span className="text-sm md:text-base align-middle font-thin">-</span>
    );
  };

  const handleSort = (key: sortkey, start = "asc") => {
    let dir = start;
    if (sorted.key == key && sorted.dir == start) {
      dir = start == "desc" ? "asc" : "desc";
    }
    setSorted({ key: key, dir: dir });
    const d = dir == "asc" ? 1 : -1;
    if (key == "title") {
      setData(
        [...data].sort((a, b) =>
          normalizeTitle(a[key]) < normalizeTitle(b[key]) ? d : -d
        )
      );
    } else setData([...data].sort((a, b) => (a[key] < b[key] ? d : -d)));
  };

  const handleFlip = (index: number) => {
    setFlipped(flipped.map((tile, i) => (i == index ? true : tile)));
    setTimeout(() => {
      setFlipped(flipped.map((tile, i) => (i == index ? false : tile)));
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-base text-center text-gray-800 md:text-lg lg:text-xl">
        Here are the {movies.length} eligible films for consideration
      </h3>
      <div className="text-center">
        <ControlledSwitch checked={hidden} setChecked={setHidden} />
      </div>
      <div className="h-[512px] md:h-[600px] xl:h-[900px] overflow-y-scroll">
        {!hidden && (
          <div className="grid gap-1.5 p-4 grid-cols-[repeat(auto-fit,_minmax(max(60px,_10%),_1fr))] justify-center md:gap-3 xl:p-2">
            {movies.map((film, index) => (
              <div
                key={film.id}
                className={`relative transform-style-preserve-3d transition-transform duration-500 ${
                  flipped[index] ? "rotate-y-180" : ""
                }`}
                onClick={() => handleFlip(index)}
              >
                {/* Front Side */}
                <div
                  className={`backface-hidden ${
                    flipped[index] ? "hidden" : ""
                  }`}
                >
                  <Film
                    key={film.id}
                    name={film.id}
                    title={film.title}
                    path={"film"}
                    type="jpg"
                  />
                </div>
                {/* Back Side */}
                <div
                  className={`flex items-center justify-center h-full w-full backface-hidden rotate-y-180 ${
                    flipped[index] ? "" : "hidden"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-xs md:text-sm lg:text-base ">
                      {"Noah's Grade:"}
                    </p>
                    <span className="text-lg lg:text-xl">{film.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {hidden && (
          <>
            <div className="flex flex-col md:flex-row m-2 justify-center">
              <table className="bg-white text-base lg:text-lg table-fixed">
                <thead className="text-sm md:text-base text-center">
                  <tr>
                    <th
                      className="border border-gray-200 lg:px-4"
                      onClick={() => handleSort("title", "desc")}
                    >
                      Title {sortIcon("title")}
                    </th>
                    <th
                      className="border border-gray-200 lg:px-2 min-w-[60px]"
                      onClick={() => handleSort("rating")}
                    >
                      Grade {sortIcon("rating")}
                    </th>
                    <th
                      className="border border-gray-200 lg:px-4"
                      onClick={() => handleSort("release")}
                    >
                      Year {sortIcon("release")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr className="text-sm xl:text-base" key={row.id}>
                      <td className="border border-gray-200 px-1">
                        {row.title}
                      </td>
                      <td className="border border-gray-200 text-center px-2">
                        {" "}
                        {row.grade}
                      </td>
                      <td className="border border-gray-200 text-center px-2">
                        {row.release}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Gallery.proptypes = {
  movies: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default Gallery;
