"use client";

import Image from "next/image";

export default function Nominees({
  category,
  images,
  descriptions,
}: {
  category: string;
  images: string[];
  descriptions: [string, string][];
}) {
  return (
    <div className="bg-white mx-4 sm:mx-10 my-4 lg:mb-32 rounded-lg max-h-128">
      <h3 className="text-2xl text-center font-bold text-gray-800 md:text-3xl lg:text-4xl pt-2 sm:pt-8 sm:pb-4">
        {category}
      </h3>
      <div className="grid gap-x-3 gap-y-2 justify-center grid-cols-3 grid-rows-2 m-4 sm:gap-x-6 sm:gap-y-4 sm:px-6 md:px-8 xl:px-20">
        {images.map((img, i) => (
          <div className="place-items-center" key={i}>
            <Image
              className="w-full md:w-4/6 h-auto rounded-lg"
              src={img}
              alt={descriptions[i][0]}
              width={200}
              height={200}
            />
            <p className="w-full text-xs sm:text-sm md:text-base xl:text-large text-center sm:my-2">
              <span className="font-semibold">{descriptions[i][0]}</span>{" "}
              {descriptions[i][1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
