import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  changeSystem,
  homeHeroDetails,
  homeHeroImage,
} from "../../configs/systemConfiguration";
import { setBiotimeToken } from "../../redux/slices/biotimeSlice";
changeSystem(false);
const homeHeroDetailsData = homeHeroDetails("H. A. K. ACADEMY");
export function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://173.249.28.63/jwt-api-token-auth/", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Make sure this matches the data you're sending
      },
      body: JSON.stringify({
        username: "admin",
        password: "salsadsid1212",
      }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(setBiotimeToken({ token: data.token })))
      .catch((error) => console.error("Error:", error));
  }, []);
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
      <img
        src="/assets/home_hero_graphic.png"
        alt={homeHeroImage.alt}
        className="object-cover w-full h-5/6 rounded-xl"
      />
    </div>
  );
}

export default Home;
