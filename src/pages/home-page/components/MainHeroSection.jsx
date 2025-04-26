import { Carousel } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  changeSystem,
  homeHeroDetails,
  isSystem,
} from "../../../configs/systemConfiguration";
import { cn } from "../../../utils/cn";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
const MainHeroSection = ({ className, hideButton }) => {
  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center bg-gradient-to-r from-blue-900/95 to-indigo-900/95",
        className
      )}
    >
      <div className="container mx-auto px-4 py-10 lg:py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="absolute inset-0 bg-[url('/assets/school_pattern.avif')] opacity-10 mix-blend-soft-light" />
        {/* Text Content */}
        <div className="text-white space-y-8 relative z-10">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
              Welcome to
              <br />
            </span>{" "}
            {homeHeroDetailsData.title}
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 font-light leading-relaxed max-w-2xl">
            {homeHeroDetailsData.description}
          </p>

          {!isSystem && !hideButton && (
            <Link
              to="/auth/sign-in"
              className="inline-block group transition-transform hover:scale-105"
            >
              <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <span>Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          )}
        </div>

        {/* Image Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-500">
          <Carousel
            autoplay={true}
            autoplayDelay={5000}
            loop={true}
            transition={{ duration: 2 }}
            className="rounded-xl aspect-video"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {new Array(length).fill("").map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-8 rounded-full transition-all duration-300 ${
                      activeIndex === i ? "bg-amber-500" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            nextArrow={({ handleNext }) => (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative h-full w-full">
                <img
                  src={`/assets/school_images_${num}.jpg`}
                  alt={`Campus ${num}`}
                  className="h-full w-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Decorative Elements */}
    </div>
  );
};

export default MainHeroSection;
