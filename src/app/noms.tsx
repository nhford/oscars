"use client";

import Image from "next/image";

export default function Nominees({
  title,
  images,
  descriptions,
}: {
  title: string;
  images: string[];
  descriptions: string[];
}) {
  return (
    <div className="bg-white mx-4 sm:mx-10">
      <h3 className="text-2xl text-center font-bold text-gray-800 md:text-3xl lg:text-4xl pt-2 sm:pt-8 sm:pb-4">
        {title}
      </h3>
      <div className="grid gap-3 justify-center grid-cols-3 grid-rows-2 pb-8 m-4 sm:gap-8 sm:px-6 md:px-8 xl:px-24">
        {images.map((img, i) => (
          <div key={i}>
            <Image
              className="w-full h-auto rounded-lg"
              src={img}
              alt={descriptions[i]}
              width={200}
              height={200}
            />
            <p className="w-full text-xs sm:text-sm md:text-base lg:text-lg text-center sm:my-2">
              {descriptions[i]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
