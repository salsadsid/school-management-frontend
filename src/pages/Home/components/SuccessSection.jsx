import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const successStories = [
  {
    title: "15,000+ Students Enrolled",
    description:
      "Trusted by students and parents for delivering quality education and innovative tools.",
  },
  {
    title: "500+ Successful Projects",
    description:
      "Empowering schools with advanced management systems that revolutionize education.",
  },
  {
    title: "100+ Schools Benefited",
    description:
      "Making a lasting impact on institutions by simplifying administrative tasks.",
  },
];

export function SuccessStoriesSection() {
  return (
    <section className="bg-gray-900/90 py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16 text-center lg:mb-28">
          <Typography variant="h6" color="white" className="text-lg">
            Our Success Stories
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Hear from Our Happy Students
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-500 max-w-4xl"
          >
            Our team of passionate and experienced teachers is committed to
            providing the best education and support to our students, fostering
            a love for learning and personal growth.
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <Typography
                  color="blue-gray"
                  className="mt-1 mb-2 text-[20px] font-bold"
                >
                  {story.title}
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pt-0">
                <Typography className="font-normal text-gray-600">
                  {story.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 px-4">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStoriesSection;
