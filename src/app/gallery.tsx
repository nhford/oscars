import data from "./assets/index.json";
import Film from "./film";

interface MovieData {
  [key: string]: string;
}

const movies: MovieData = data;

// interface GalleryProps {
//   abbrev: string;
//   title: string;
// }

function Gallery() {
  return (
    <>
      {Object.entries(movies).map(([abbrev, title]) => (
        <Film key={abbrev} abbrev={abbrev} title={title} />
      ))}
    </>
  );
}

export default Gallery;
