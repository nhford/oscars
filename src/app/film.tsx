"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FilmProps {
  name: string;
  title: string;
  path: string;
  type: string;
}

function Film({ name, title, path, type }: FilmProps) {
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
        className={path}
        src={`/${path}/${name}.${type}`}
        alt={title}
        width={200}
        height={200}
      />
      {`/${path}/${name}.${type}`}
      {/* </div> */}
      {/* Back */}
      {/* <div className="film-back"></div> */}
      {/* </div> */}
    </div>
  );
}

export default Film;
