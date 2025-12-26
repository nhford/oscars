"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FilmProps {
  name: string;
  title: string;
  year: number;
  path: string;
  type: string;
}

function Film({ name, title, year, path, type }: FilmProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`m-0.5`} onClick={handleClick}>
      {/* <div className="filmInner"> */}
      {/* Front */}
      {/* <div className="film-front"> */}
      <Image
        className="rounded-lg"
        src={`/${year}/${path}/${name}.${type}`}
        alt={title}
        width={200}
        height={200}
      />
      {/* </div> */}
      {/* Back */}
      {/* <div className="film-back"></div> */}
      {/* </div> */}
    </div>
  );
}

export default Film;
