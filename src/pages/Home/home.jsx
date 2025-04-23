import {
  Button,
  Carousel,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  changeSystem,
  homeHeroDetails,
  isSystem,
} from "../../configs/systemConfiguration";
import FeatureSection from "./components/FeatureSection";
import SchoolMessageSection from "./components/SchoolMessageSection";
import SuccessStoriesSection from "./components/SuccessSection";
import TeacherSection from "./components/TeacherSection";
import TestimonialSection from "./components/TestimonialSection";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
export const Home = () => {
  return (
    <main className=" bg-white  mx-auto">
      <div className="container mx-auto grid w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <h2
            className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 text-3xl !leading-tight lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: homeHeroDetailsData.title }}
          ></h2>
          <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-12 !text-gray-500 md:pr-16 xl:pr-28">
            {homeHeroDetailsData.description}
          </p>
          {!isSystem && (
            <Link to="/admission-form">
              <Button color="amber" size="lg">
                Admission Form
              </Button>
            </Link>
          )}
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

      {/* Features */}
      <FeatureSection />
      <section className="my-12 container mx-auto">
        <div className="p-10 rounded-l-xl border border-blue-gray-100 bg-[url('assets/book_graphics.jpg')] rounded-xl bg-no-repeat lg:bg-contain bg-cover bg-right">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-bold mb-2"
          >
            Upcoming Events
          </Typography>
          <Typography variant="h3" color="blue-gray">
            Book distribution 2025
          </Typography>
          <Typography className="mt-2 mb-6 !text-base font-normal text-gray-500">
            Empowering Students with Knowledge and Resources.
          </Typography>
        </div>
      </section>
      {/* Success Stories */}
      <SuccessStoriesSection />
      <TeacherSection />
      {/* Testimonials */}
      <TestimonialSection />

      {/* Contact Us */}
      <SchoolMessageSection />

      {/* Footer */}
      <footer className="bg-teal-500 relative text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <Typography className="text-lg font-bold mb-2">
            H.A.K Academy
          </Typography>
          <Typography className="mb-4">
            Empowering the future of education | Estd: 2003
          </Typography>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/hak.academy/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-200"
            >
              Facebook Page
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="absolute bottom-0  right-1 text-xs text-gray-400">
          salsadsid
        </div>
      </footer>
    </main>
  );
};
