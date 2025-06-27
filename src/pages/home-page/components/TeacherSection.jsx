import {
  Avatar,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";

function TeacherCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-gray-100" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src="assets/avator.png"
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-top"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-lg"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-linkedin text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

const teachers = [
  {
    name: "Selina Parvin",
    title: "Mathematics Teacher",
  },
  {
    name: "Sonali Biswas",
    title: "Science Teacher",
  },
  {
    name: "MST. FARHANA BEGUM",
    title: "English Teacher",
  },
  {
    name: "Golum Rabbani",
    title: "History Teacher",
  },
  {
    name: "Ahasanul Haque Khan",
    title: "Art Teacher",
  },
  {
    name: "JANNATUL HASAN",
    title: "Physical Education Teacher",
  },
  {
    name: "Shapnat Rani",
    title: "Music Teacher",
  },
  {
    name: "Monika Rani Pondit",
    title: "Geography Teacher",
  },
];

export function TeacherSection() {
  return (
    <section className="min-h-screen py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography variant="h6" color="blue-gray" className="text-lg">
            Meet Our Teachers
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Dedicated Educators Shaping the Future
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teachers.map((props, key) => (
            <TeacherCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeacherSection;
