"use client";

import Image from "next/image";

export default function Winner({
  category,
  image,
  first,
  second,
}: {
  category: string;
  image: string;
  first: string;
  second: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full px-6 py-8">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-4xl font-bold">{category}</h1>
        <p className="text-lg mt-4">
          Runner-Up: <span className="font-semibold">{second}</span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center md:w-1/2 mt-6 md:mt-0">
        <Image
          src={image} // Path to the image
          alt={first}
          width={300} // Adjust based on your layout
          height={450} // Adjust based on your layout
          className="rounded-lg shadow-lg"
        />
        <p className="text-lg mt-4 font-semibold text-center">{first}</p>
      </div>
    </div>
  );
}
