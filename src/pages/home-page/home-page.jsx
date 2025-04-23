import { Typography } from "@material-tailwind/react";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import MainHeroSection from "./components/MainHeroSection";
import SchoolMessageSection from "./components/SchoolMessageSection";
import SuccessStoriesSection from "./components/SuccessSection";
import TeacherSection from "./components/TeacherSection";
import TestimonialSection from "./components/TestimonialSection";

export const HomePage = () => {
  return (
    <main className=" bg-white mx-auto">
      <MainHeroSection />

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
