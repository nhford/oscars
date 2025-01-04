"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FilmProps {
  abbrev: string;
  title: string;
}

function Film({ abbrev, title }: FilmProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`film${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      {/* <div className="filmInner"> */}
      {/* Front */}
      {/* <div className="film-front"> */}
      <Image
        className="film"
        src={`/films/${abbrev}.jpg`}
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
