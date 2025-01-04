import Film from "./film";
import PropTypes from "prop-types";

function Gallery({ movies }) {
  return (
    <div className="gallery">
      {Object.entries(movies).map(([abbrev, title]) => (
        <Film key={abbrev} abbrev={abbrev} title={title} />
      ))}
    </div>
  );
}

Gallery.proptypes = {
  movies: PropTypes.object.isRequired,
};

export default Gallery;
