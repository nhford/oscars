"use client";

import Image from "next/image";

export default function Nominees({
  category,
  images,
  descriptions,
  dimensions,
}: {
  category: string;
  images: string[];
  descriptions: [string, string][];
  dimensions: [number, number];
}) {
  const [rows, cols] = dimensions;
  return (
    <div className="h-full">
      <h3 className="text-2xl text-center font-bold text-gray-800 md:text-3xl lg:text-4xl pt-2 sm:pt-8 sm:pb-4">
        {category}
      </h3>
      <div
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
        className={`md:h-[80%] grid gap-x-3 gap-y-2 justify-center m-2 md:m-4 px-2`}
      >
        {images.map((img, i) => (
          <div className="md:w-full place-items-center lg:p-1 md:p-4" key={i}>
            <Image
              className="rounded-lg object-fit"
              src={img}
              alt={descriptions[i][0]}
              width={rows > cols ? 320 : 200}
              height={200}
            />
            <p className="w-full text-xs sm:text-sm md:text-base xl:text-large text-center sm:my-2 overflow-hidden">
              <span className="font-semibold">{descriptions[i][0]}</span>
              <br></br>
              {descriptions[i][1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
