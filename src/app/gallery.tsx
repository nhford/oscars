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

  //   export function handleSort(key,[sorted,setSorted,data,setData],natural="desc"){
  //     let dir = natural;
  //     if(sorted.key == key && sorted.dir == natural){
  //       dir = natural == "desc" ? "asc" : "desc";
  //     }
  //     setSorted({key,dir});
  //     let i = dir == "asc" ? 1 : -1;
  //     setData([...data].sort((a,b) => a[key] < b[key] ? i : -i));
  // }

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

  return (
    <div className="h-full bg-red-200 xl:min-h-[800px]">
      <h3 className="text-base text-center text-gray-800 md:text-lg lg:text-xl">
        Here are the {movies.length} eligible films for consideration
      </h3>
      <div className="text-center">
        <ControlledSwitch checked={hidden} setChecked={setHidden} />
      </div>
      <div className="bg-green-200">
        {!hidden && (
          <div className="grid gap-3 p-4 grid-cols-[repeat(auto-fit,_minmax(max(45px,_10%),_1fr))] justify-center md:gap-3 xl:p-2">
            {movies.map((film) => (
              <Film
                key={film.id}
                name={film.id}
                title={film.title}
                path={"film"}
                type="jpg"
              />
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
