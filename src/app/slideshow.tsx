"use client";

import React, { useState } from "react";
import {
  Movie,
  Nominee,
  Winner,
  createNomineeObject,
  createWinnerObject,
} from "./util";

export default function Slideshow({ movies }: { movies: Movie[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle slide navigation
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length));
  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  //   TODO: only works if each film has one nom for each category
  const suppNominees = createNomineeObject({
    category: "Best Supporting Actor Nominees",
    movies: movies,
    filterKey: "suppId",
    imagePath: "/supp",
    getDescription: (film) =>
      `${film.suppName} - ${film.title} (${film.release})`,
  });

  const suppWinner = createWinnerObject({
    category: "Best Supporting Actor Winner",
    movies: movies,
    filterKey: "supporting",
    displayKey: "suppId",
    imagePath: "/supp",
    getDescription: (film) =>
      `${film.suppName} - ${film.title} (${film.release})`,
  });

  const actorNominees = createNomineeObject({
    category: "Best Actor Nominees",
    movies: movies,
    filterKey: "actorId",
    imagePath: "/actor",
    getDescription: (film) =>
      `${film.actorName} - ${film.title} (${film.release})`,
  });

  const actorWinner = createWinnerObject({
    category: "Best Actor Winner",
    movies: movies,
    filterKey: "actor",
    displayKey: "actorId",
    imagePath: "/actor",
    getDescription: (film) =>
      `${film.actorName} - ${film.title} (${film.release})`,
  });

  const endingNominees = createNomineeObject({
    category: "Best Ending Nominees",
    movies: movies,
    filterKey: "ending",
    imagePath: "/film",
    getDescription: (film) => `${film.title} (${film.release})`,
  });

  const endingWinner = createWinnerObject({
    category: "Best Ending Winner",
    movies: movies,
    filterKey: "ending",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => `${film.title} (${film.release})`,
  });

  const movieNominees = createNomineeObject({
    category: "Best Movie Nominees",
    movies: movies,
    filterKey: "movie",
    imagePath: "/film",
    getDescription: (film) => `${film.title} (${film.release})`,
  });

  const movieWinner = createWinnerObject({
    category: "Best Movie Winner",
    movies: movies,
    filterKey: "movie",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => `${film.title} (${film.release})`,
  });

  // Example data for the gallery slides
  const slides = [
    suppNominees,
    suppWinner,
    actorNominees,
    actorWinner,
    endingNominees,
    endingWinner,
    movieNominees,
    movieWinner,
  ];

  const CurrentComponent = slides[currentSlide].type;

  return (
    <div className="slideshow-container content-center w-[100%]">
      {/* Instructions */}
      <div className="w-full flex items-center justify-center">
        <i className="text-center pb-2 sm:my-1">
          Click on the right side of the slides to advance, and the left side to
          go back.
        </i>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons flex justify-between mt-4">
        <button
          className="prev-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <button
          className="next-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
        >
          Next
        </button>
      </div>

      {/* Gallery Slides */}
      <CurrentComponent key={currentSlide} {...slides[currentSlide].props} />
    </div>
  );
}
