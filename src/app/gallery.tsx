import Film from "./film";
import PropTypes from "prop-types";
import { Movie } from "./util";

function Gallery({ movies, path }: { movies: Movie[]; path: string }) {
  return (
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
              name={`${film.actorId}_${film.id}`}
              title={film.title}
              path={path}
              type="png"
            />
          ))}
    </div>
  );
}

Gallery.proptypes = {
  movies: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default Gallery;
