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
      <h3 className="text-lg text-center text-black mt-4">
        Here are the {movies.length} elgible movies for Noah Oscar
        consideration.
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
          {movies.map((film) => (
            <p className="text-center" key={film.id}>
              {film.title}
            </p>
          ))}
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
