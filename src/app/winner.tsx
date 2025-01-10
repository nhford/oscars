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
  first: [string, string];
  second: [string, string];
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:py-8 bg-white mx-4 sm:mx-10 my-4 lg:mb-32 rounded-lg max-h-128">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2 md:mx-4">
        <h3 className="text-2xl font-bold text-gray-800 md:ml-3 md:text-3xl lg:text-4xl pt-2 sm:pt-8 sm:pb-4">
          {category}
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl my-1 py-2 md:ml-3 md:mt-12">
          <span className="font-semibold">{first[0]}</span> {first[1]}
        </p>
        <p className="text-bottom text-lg md:mt-12 md:ml-3">
          Runner-Up: <span className="font-semibold">{second[0]}</span>{" "}
          {second[1]}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center md:w-1/2 my-2 md:mt-0">
        <Image
          src={image} // Path to the image
          alt={first[0]}
          width={300} // Adjust based on your layout
          height={450} // Adjust based on your layout
          className="rounded-lg shadow-lg w-2/3 md:w-full"
        />
      </div>
    </div>
  );
}
