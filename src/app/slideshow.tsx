"use client";

import React, { useState } from "react";

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Example data for the gallery slides
  const slides = [
    { type: "gallery", images: ["/img1.jpg", "/img2.jpg"], text: "Gallery 1" },
    { type: "gallery", images: ["/img3.jpg", "/img4.jpg"], text: "Gallery 2" },
  ];

  // Function to handle slide navigation
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length));
  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="slideshow-container content-center w-[100%]">
      {/* First Slide: Black square with play button */}
      {currentSlide === 0 && (
        <div className="slide black-square flex self-center text-center items-center justify-center py-[max(20%,135px)] h-[100%] w-[100%] bg-black text-white">
          <button
            className="play-button bg-white text-black px-4 py-2 rounded"
            onClick={handleNext}
          >
            Play
          </button>
        </div>
      )}

      {/* Gallery Slides */}
      {currentSlide > 0 && slides[currentSlide - 1]?.type === "gallery" && (
        <div className="slide gallery-slide">
          <div className="images flex justify-center gap-4">
            {slides[currentSlide - 1].images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${currentSlide} Image`}
                className="w-32 h-32 object-cover"
              />
            ))}
          </div>
          <p className="text-center mt-4">{slides[currentSlide - 1].text}</p>
        </div>
      )}

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
          disabled={currentSlide === slides.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
