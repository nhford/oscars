"use client";

import Film from "./film";
import PropTypes from "prop-types";
import { Movie } from "./util";
import ControlledSwitch from "./switch";
import { useState } from "react";

function Gallery({ movies }: { movies: Movie[] }) {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="">
      <h3 className="text-base text-center text-gray-800 md:text-lg lg:text-xl">
        Here are the {movies.length} eligible films for consideration
      </h3>
      <div className="text-center">
        <ControlledSwitch checked={hidden} setChecked={setHidden} />
      </div>
      {!hidden && (
        <div className="grid gap-3 p-4 grid-cols-[repeat(auto-fit,_minmax(max(45px,_10%),_1fr))] justify-center md:gap-2 xl:gap-1 xl:p-2">
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
    </div>
  );
}

Gallery.proptypes = {
  movies: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default Gallery;
