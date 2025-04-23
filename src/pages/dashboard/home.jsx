import { Carousel, IconButton } from "@material-tailwind/react";
import {
  changeSystem,
  homeHeroDetails,
} from "../../configs/systemConfiguration";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
export function Home() {
  return (
    <div className="container mx-auto grid w-full grid-cols-1 items-center lg:grid-cols-2">
      <div className="row-start-2 lg:row-auto">
        <h2
          className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 text-3xl !leading-tight lg:text-5xl"
          dangerouslySetInnerHTML={{ __html: homeHeroDetailsData.title }}
        ></h2>
        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-12 !text-gray-500 md:pr-16 xl:pr-28">
          {homeHeroDetailsData.description}
        </p>
      </div>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        loop={true}
        transition={{ duration: 2 }}
        className="rounded-xl"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        <img
          src="/assets/school_images.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="/assets/school_images_2.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="/assets/school_images_3.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <img
          src="/assets/school_images_4.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <img
          src="/assets/school_images_5.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}

export default Home;
