"use client";

import React, { useEffect, useState } from "react";
import {
  Movie,
  WinnerOutput,
  NomineeOutput,
  TransitionOutput,
  NomineesProp,
  WinnerProp,
  TransitionProp,
  createNomineeObject,
  createWinnerObject,
  createTransitionObject,
} from "./util";
import Transition from "./transition";
import Nominees from "./noms";
import Winner from "./winner";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Slideshow({
  movies,
  year,
}: {
  movies: Movie[];
  year: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [useTransition, setUseTransition] = useState(true);

  useEffect(() => {
    setCurrentSlide(0);
  }, [year]);

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
  const suppNominees: NomineeOutput = createNomineeObject({
    category: "Best Supporting Actor Nominees",
    movies: movies,
    filterKey: "supporting",
    displayKey: "suppId",
    imagePath: "/supp",
    getDescription: (film) =>
      film.suppName.map((supp) => [supp, `${film.title} (${film.release})`]),
  });

  const suppWinner: WinnerOutput = createWinnerObject({
    category: "Best Supporting Actor",
    movies: movies,
    filterKey: "supporting",
    displayKey: "suppId",
    imagePath: "/supp",
    getDescription: (film, idx) => [
      `${film.suppName[idx]}`,
      `${film.title} (${film.release})`,
    ],
  });

  const actorNominees: NomineeOutput = createNomineeObject({
    category: "Best Actor Nominees",
    movies: movies,
    filterKey: "actor",
    displayKey: "actorId",
    imagePath: "/actor",
    getDescription: (film) =>
      film.actorName.map((actor) => [actor, `${film.title} (${film.release})`]),
  });

  const actorWinner: WinnerOutput = createWinnerObject({
    category: "Best Actor",
    movies: movies,
    filterKey: "actor",
    displayKey: "actorId",
    imagePath: "/actor",
    getDescription: (film, idx) => [
      `${film.actorName[idx]}`,
      `${film.title} (${film.release})`,
    ],
  });

  const sceneNominees: NomineeOutput = createNomineeObject({
    category: "Best Scene Nominees",
    movies: movies,
    filterKey: "scene",
    displayKey: "id",
    imagePath: "/scene",
    getDescription: (film) =>
      film.sceneTitle.map((sceneTitle) => [`${film.title}`, sceneTitle]),
  });

  const sceneWinner: WinnerOutput = createWinnerObject({
    category: "Best Scene",
    movies: movies,
    filterKey: "scene",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film, idx) => [
      `${film.title}`,
      `(${film.sceneTitle[idx]})`,
    ],
  });

  const endingNominees: NomineeOutput = createNomineeObject({
    category: "Best Ending Nominees",
    movies: movies,
    filterKey: "ending",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [[`${film.title}`, `(${film.release})`]],
  });

  const endingWinner: WinnerOutput = createWinnerObject({
    category: "Best Ending",
    movies: movies,
    filterKey: "ending",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const movieNominees: NomineeOutput = createNomineeObject({
    category: "Best Movie Nominees",
    movies: movies,
    filterKey: "movie",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [[`${film.title}`, `(${film.release})`]],
  });

  const movieWinner: WinnerOutput = createWinnerObject({
    category: "Best Movie",
    movies: movies,
    filterKey: "movie",
    displayKey: "id",
    imagePath: "/film",
    getDescription: (film) => [`${film.title}`, `(${film.release})`],
  });

  const transition: TransitionOutput = createTransitionObject({
    message: "And the winner is...",
  });

  type Slide =
    | { type: React.ComponentType<TransitionProp>; props: TransitionProp }
    | { type: React.ComponentType<NomineesProp>; props: NomineesProp }
    | { type: React.ComponentType<WinnerProp>; props: WinnerProp };

  // Example data for the gallery slides
  const slides: Slide[] = [
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
      {/* Instructions */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full md:w-1/2 text-center sm:my-1 italic">
          Click the through the slides!
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons flex items-center justify-center py-2">
        <button
          className="prev-button bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setCurrentSlide(0)}
          disabled={currentSlide === 0}
        >
          {"Jump to Start"}
        </button>
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

      {/* Transitions Button */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full md:w-1/2 lg:px-2 text-center">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={"Transitions"}
            onClick={() => setUseTransition((prev) => !prev)}
            className="text-xs md:text-sm lg:text-base"
            labelPlacement="start"
          />
        </div>
      </div>

      {/* Gallery Slides */}
      <div className="w-full sm:h-[500px] md:w-[90%] md:mx-[5%] md:h-[600px] lg:h-[900px] my-1 md:my-4 rounded-lg bg-white">
        <div className="relative w-full h-full sm:overflow-y-scroll">
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
            {CurrentComponent === Transition && (
              <CurrentComponent
                {...(slides[currentSlide].props as TransitionProp)}
              />
            )}
            {CurrentComponent === Nominees && (
              <CurrentComponent
                {...(slides[currentSlide].props as NomineesProp)}
              />
            )}
            {CurrentComponent === Winner && (
              <CurrentComponent
                {...(slides[currentSlide].props as WinnerProp)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
