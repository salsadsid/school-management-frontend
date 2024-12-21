import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  changeSystem,
  homeHeroDetails,
  homeHeroImage,
  isSystem,
} from "../../configs/systemConfiguration";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import SchoolMessageSection from "./components/SchoolMessageSection";
import SuccessStoriesSection from "./components/SuccessSection";
import TeacherSection from "./components/TeacherSection";
import TestimonialSection from "./components/TestimonialSection";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
export const HomePage = () => {
  return (
    <main className=" bg-white  mx-auto">
      <div className="container my-12 mx-auto grid w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 mx-2 py-6 lg:row-auto">
          <h2
            className="block antialiased sm:text-left text-center tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 text-3xl !leading-tight lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: homeHeroDetailsData.title }}
          ></h2>
          <p className="block antialiased sm:text-left text-center font-sans text-xl font-normal leading-relaxed text-inherit mb-12 !text-gray-500 md:pr-16 xl:pr-28">
            {homeHeroDetailsData.description}
          </p>
          {!isSystem && (
            <Link to="/admission-form">
              <Button
                color="amber"
                size="lg"
                className="block mx-auto sm:mx-0 sm:w-52 w-full"
              >
                Admission Form
              </Button>
            </Link>
          )}
        </div>
        <img
          src="assets/home_hero_graphic.png"
          alt={homeHeroImage.alt}
          className="object-cover w-full h-5/6 rounded-xl"
        />
      </div>

      {/* Features */}
      <FeatureSection />
      <section className="my-12 container mx-auto">
        <div className="p-10 rounded-l-xl border border-blue-gray-100 sm:bg-[url('/assets/book_graphics.jpg')] rounded-xl bg-no-repeat lg:bg-contain bg-cover bg-right">
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
      <Footer />
    </main>
  );
};
