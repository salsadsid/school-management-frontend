import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function TestimonialCard({ img, client, title, clientInfo }) {
  return (
    <Card shadow={false} className="bg-teal-50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="lg:mb-20 mb-4 text-2xl font-bold"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-500"
          >
            {clientInfo}
          </Typography>
        </div>
        <Avatar src="https://via.placeholder.com/100" className="mb-4" />
      </CardBody>
    </Card>
  );
}

const testimonials = [
  {
    title:
      "The school has provided an excellent environment for my child's growth and learning. The teachers are very supportive.",
    client: "John Doe",
    clientInfo: "Parent of Class 4 Student",
    img: "/image/parent1.jpg",
  },
  {
    title:
      "I am very impressed with the facilities and the quality of education provided. My child loves going to school every day.",
    client: "Jane Smith",
    clientInfo: "Parent of Class 3 Student",
    img: "/image/parent2.jpg",
  },
];

export function TestimonialSection() {
  return (
    <section className="px-8 py-10 lg:py-28">
      <div className="container mx-auto">
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-4 !text-2xl lg:!text-4xl"
        >
          Heartfelt Testimonials from Our School Community
        </Typography>
        <Typography
          variant="lead"
          className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
        >
          Hear from parents and students about their experiences and the
          positive impact our school has had on their lives.
        </Typography>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {testimonials.map((props, key) => (
            <TestimonialCard key={key} {...props} />
          ))}
        </div>

        <Card
          shadow={false}
          className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
        >
          <CardHeader color="transparent" floated={false} shadow={false}>
            <Typography
              color="blue-gray"
              className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
            >
              &quot;The school&apos;s dedication to student success is evident
              in every aspect. We are grateful for the wonderful
              experience.&quot;
            </Typography>
          </CardHeader>
          <CardBody className="items-center mx-auto py-2">
            <Avatar src="https://via.placeholder.com/100" className="mb-4" />
            <Typography variant="h6" color="blue-gray">
              Emily Johnson
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal !text-gray-500"
            >
              Parent of Class 2 Student
            </Typography>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default TestimonialSection;
