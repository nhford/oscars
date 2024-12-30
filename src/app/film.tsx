import Image from "next/image";

interface FilmProps {
  abbrev: string;
  title: string;
}

function Film({ abbrev, title }: FilmProps) {
  return (
    <>
      <Image
        className="film"
        src={`/films/${abbrev}.jpg`}
        alt={title}
        width={200}
        height={200}
      />
      <h3>{title}</h3>
    </>
  );
}

export default Film;
