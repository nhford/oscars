"use client";

import React, { useState } from "react";
import { Movie, createNomineeObject, createWinnerObject } from "./util";
import Transition from "./transition";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Slideshow({ movies }: { movies: Movie[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [useTransition, setUseTransition] = useState(true);

  // Function to handle slide navigation
  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    if (currentSlide < slides.length - 1) {
      if (useTransition && slides[currentSlide + 1].type == Transition) {
        setTimeout(() => {
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        }, 1000);
      } else if (slides[currentSlide + 1].type == Transition) {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      }
    }
  };
  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
    if (currentSlide >= 0) {
      if (slides[currentSlide - 1].type == Transition) {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  //   TODO: only works if each film has one nom for each category
  const suppNominees = createNomineeObject({
    category: "Best Supporting Actor Nominees",
    movies: movies,
    filterKey: "supporting",
    displayKey: "suppId",
    imagePath: "/supp",
    getDescription: (film) => [
      `${film.suppName}`,
      `${film.title} (${film.release})`,
    ],
  });

  const suppWinner = createWinnerObject({
    category: "Best Supporting Actor",
    movies: movies,
    filterKey: "supporting",
    displayKey: "suppId",
    imagePath: "/supp",
    getDescription: (film) => [
      `${film.suppName}`,
      `${film.title} (${film.release})`,
    ],
  });

  const actorNominees = createNomineeObject({
    category: "Best Actor Nominees",
    movies: movies,
    filterKey: "actor",
    displayKey: "actorId",
    imagePath: "/actor",
    getDescription: (film) => [
      `${film.actorName}`,
      `${film.title} (${film.release})`,
    ],
  });

  const actorWinner = createWinnerObject({
    category: "Best Actor",
    movies: movies,
    filterKey: "actor",
    displayKey: "actorId",
    imagePath: "/actor",
    getDescription: (film) => [
      `${film.actorName}`,
      `${film.title} (${film.release})`,
    ],
  });

  const sceneNominees = createNomineeObject({
    category: "Best Scene Nominees",
    movies: movies,
    filterKey: "scene",
    displayKey: "id",
    imagePath: "/scene",
    getDescription: (film) => [`${film.title}`, `(${film.sceneTitle})`],
  });
  console.log(sceneNominees.props.dimensions);

  const sceneWinner = createWinnerObject({
    category: "Best Scene",
    movies: movies,
    filterKey: "scene",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.sceneTitle})`],
  });

  const endingNominees = createNomineeObject({
    category: "Best Ending Nominees",
    movies: movies,
    filterKey: "ending",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const endingWinner = createWinnerObject({
    category: "Best Ending",
    movies: movies,
    filterKey: "ending",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const movieNominees = createNomineeObject({
    category: "Best Movie Nominees",
    movies: movies,
    filterKey: "movie",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const movieWinner = createWinnerObject({
    category: "Best Movie",
    movies: movies,
    filterKey: "movie",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const transition = {
    type: Transition,
    props: {},
  };

  // Example data for the gallery slides
  const slides = [
    suppNominees,
    transition,
    suppWinner,
    actorNominees,
    transition,
    actorWinner,
    sceneNominees,
    transition,
    sceneWinner,
    endingNominees,
    transition,
    endingWinner,
    movieNominees,
    transition,
    movieWinner,
  ];

  const CurrentComponent = slides[currentSlide].type;

  return (
    <div className="slideshow-container content-center w-[100%]">
      {/* Navigation Buttons */}
      <div className="navigation-buttons flex items-center justify-center py-2">
        <button
          className="prev-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          {"Previous"}
        </button>
        <button
          className="next-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
        >
          {"Next"}
        </button>
      </div>

      {/* Instructions */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full md:w-1/2 text-center sm:my-1 italic">
          Click the through the slides!
        </div>
        <div className="w-full md:w-1/2 lg:px-2 text-center">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={"Transitions"}
            onClick={() => setUseTransition((prev) => !prev)}
            className="text-xs md:text-sm lg:text-base"
            labelPlacement="start"
          />
          {/* <button
            className="prev-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setUseTransition((prev) => !prev)}
          >
            {useTransition ? "Disable Transitions" : "Enable Transitions"}
          </button> */}
        </div>
      </div>

      {/* Gallery Slides */}
      <div className="w-full h-[500px] md:w-[90%] md:mx-[5%] md:h-[600px] lg:h-[900px] my-4 rounded-lg bg-white">
        <div className="relative w-full h-full">
          {/* Left Click Area */}
          <div
            className="absolute top-0 left-0 h-full w-1/2 cursor-pointer"
            onClick={handlePrev}
          ></div>
          {/* Right Click Area */}
          <div
            className="absolute top-0 right-0 h-full w-1/2 cursor-pointer"
            onClick={handleNext}
          ></div>
          {/* Slides */}
          <div className="w-full h-full">
            <CurrentComponent
              key={currentSlide}
              {...slides[currentSlide].props}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
