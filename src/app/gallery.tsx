"use client";

import Film from "./film";
import { Movie, normalizeTitle } from "./util";
import ControlledSwitch from "./switch";
import { useState } from "react";

type sortkey = "title" | "rating" | "release" | "watched";

interface GalleryProps {
  year: string;
  movies: Movie[];
}

function Gallery({ year, movies }: GalleryProps) {
  const [hidden, setHidden] = useState(false);
  const [sorted, setSorted] = useState<{ key: sortkey; desc: boolean }>({
    key: "title",
    desc: false,
  });
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const sortIcon = (key: sortkey) => {
    return sorted.key === key ? (
      sorted.desc ? (
        <span className="text-sm md:text-base align-top">↓</span>
      ) : (
        <span className="text-sm md:text-base align-top">↑</span>
      )
    ) : (
      <span className="text-sm md:text-base align-middle font-thin">-</span>
    );
  };

  const handleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setFlipped((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-base text-center text-gray-800 md:text-lg lg:text-xl">
        <div>Here are the {movies.length} eligible films for consideration</div>
        <span className="text-sm lg:text-base italic">
          {hidden
            ? "Sort the table by clicking the column headers!"
            : "Click on a film to see its grade!"}
        </span>
      </h3>
      <div className="text-center">
        <ControlledSwitch checked={hidden} setChecked={setHidden} />
      </div>
      <div className="sm:h-[512px] md:h-[600px] xl:h-[900px] md:overflow-y-scroll">
        {!hidden && (
          <div className="grid gap-1.5 p-4 grid-cols-[repeat(auto-fit,_minmax(max(60px,_10%),_1fr))] justify-center md:gap-3 xl:p-2">
            {movies.map((film) => (
              <div
                key={film.id}
                className={`relative transform-style-preserve-3d transition-transform duration-500 cursor-pointer ${
                  flipped[film.id] ? "rotate-y-180" : ""
                }`}
                onClick={() => handleFlip(film.id)}
              >
                {/* Front Side */}
                <div
                  className={`backface-hidden ${
                    flipped[film.id] ? "hidden" : ""
                  }`}
                >
                  <Film
                    key={film.id}
                    name={film.id}
                    year={film.watched}
                    title={film.title}
                    path={"film"}
                    type="jpg"
                  />
                </div>
                {/* Back Side */}
                <div
                  className={`flex items-center justify-center h-full w-full backface-hidden rotate-y-180 ${
                    flipped[film.id] ? "" : "hidden"
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
                      onClick={() =>
                        setSorted({ key: "title", desc: !sorted["desc"] })
                      }
                    >
                      Title {sortIcon("title")}
                    </th>
                    <th
                      className="border border-gray-200 lg:px-2 min-w-[60px]"
                      onClick={() =>
                        setSorted({ key: "rating", desc: !sorted["desc"] })
                      }
                    >
                      Grade {sortIcon("rating")}
                    </th>
                    <th
                      className="border border-gray-200 lg:px-4"
                      onClick={() =>
                        setSorted({ key: "release", desc: !sorted["desc"] })
                      }
                    >
                      Release {sortIcon("release")}
                    </th>
                    {year == "All-Time" ? (
                      <th
                        className="border border-gray-200 lg:px-4"
                        onClick={() =>
                          setSorted({ key: "watched", desc: !sorted["desc"] })
                        }
                      >
                        Watched {sortIcon("watched")}
                      </th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...movies]
                    .sort((a, b) => {
                      const dir = sorted["desc"] ? 1 : -1;
                      if (sorted["key"] == "title") {
                        return normalizeTitle(a["title"]) <
                          normalizeTitle(b["title"])
                          ? dir
                          : -dir;
                      } else {
                        return a[sorted["key"]] < b[sorted["key"]] ? dir : -dir;
                      }
                    })
                    .map((row) => (
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
                        {year == "All-Time" ? (
                          <td className="border border-gray-200 text-center px-2">
                            {row.watched}
                          </td>
                        ) : (
                          ""
                        )}
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

export default Gallery;
