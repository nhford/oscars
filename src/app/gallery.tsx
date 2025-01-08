"use client";

import Film from "./film";
import PropTypes from "prop-types";
import { Movie } from "./util";
import ControlledSwitch from "./switch";
import { useState } from "react";

function Gallery({
  movies,
  path,
}: {
  movies: Movie[];
  path: "film" | "supp" | "actor";
}) {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <h3 className="text-base text-center text-gray-800 md:text-lg lg:text-xl">
        Here are the {movies.length} eligible films for consideration
      </h3>
      <div className="text-center">
        <ControlledSwitch checked={hidden} setChecked={setHidden} />
      </div>
      {!hidden && (
        <div className="gallery">
          {path == "film"
            ? movies.map((film) => (
                <Film
                  key={film.id}
                  name={film.id}
                  title={film.title}
                  path={path}
                  type="jpg"
                />
              ))
            : movies.map((film) => (
                <Film
                  key={film.id}
                  name={`${film[`${path}Id`]}_${film.id}`}
                  title={film.title}
                  path={path}
                  type="png"
                />
              ))}
        </div>
      )}
      {hidden && (
        <>
          <div className="flex flex-col md:flex-row m-2">
            {[0, 1].map((part) => (
              <div
                key={part}
                className={`w-full md:w-1/2 bg-gray-100 ${
                  part === 0 ? "mt-2" : "m-0"
                } p-0`}
              >
                {movies
                  .filter((_, i) =>
                    part === 0
                      ? i <= Math.floor(movies.length / 2)
                      : i > Math.floor(movies.length / 2)
                  )
                  .map((film) => (
                    <p className="text-center text-base" key={film.id}>
                      {film.title}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

Gallery.proptypes = {
  movies: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default Gallery;
