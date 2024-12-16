import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  changeSystem,
  homeHeroDetails,
  homeHeroImage,
  isSystem,
} from "../../configs/systemConfiguration";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
export const Home = () => {
  return (
    <header className="p-8 pt-16 bg-white">
      <div className="container mx-auto grid h-full min-h-[85vh] w-full grid-cols-1 items-center lg:grid-cols-2">
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
        <img
          src={homeHeroImage.src}
          alt={homeHeroImage.alt}
          className="object-cover w-full h-5/6 rounded-xl"
        />
      </div>
    </header>
  );
};

export default Home;
