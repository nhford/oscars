"use client";

import React, { useState } from "react";
import { Movie, createNomineeObject } from "./util";
import Nominees from "./noms";

export default function Slideshow({ movies }: { movies: Movie[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle slide navigation
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length));
  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  //   TODO: only works if each film has one nom for each category
  const actorNominees = createNomineeObject(
    "Best Actor Nominees",
    movies,
    "actorId",
    "/actor",
    "png",
    (film) => `${film.actorName} - ${film.title} (${film.release})`
  );

  const suppNominees = createNomineeObject(
    "Best Supporting Actor Nominees",
    movies,
    "suppId",
    "/supp",
    "png",
    (film) => `${film.suppName} - ${film.title} (${film.release})`
  );

  const endingNominees = createNomineeObject(
    "Best Ending Nominees",
    movies,
    "ending",
    "/film",
    "jpg",
    (film) => `${film.title} (${film.release})`
  );

  const movieNominees = createNomineeObject(
    "Best Movie Nominees",
    movies,
    "movie",
    "/film",
    "jpg",
    (film) => `${film.title} (${film.release})`
  );

  // Example data for the gallery slides
  const slides = [actorNominees, suppNominees, endingNominees, movieNominees];
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
      {/* Gallery Slides */}
      <CurrentComponent key={currentSlide} {...slides[currentSlide].props} />

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
    </div>
  );
}
