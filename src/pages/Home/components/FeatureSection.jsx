import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

export function FeatureSection() {
  return (
    <section className="lg:py-28 py-10 px-8 ">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Features
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-4xl"
        >
          Our School Management System
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-xl !text-gray-500">
          Our system is designed to simplify and enhance the management of
          school operations, providing tools for attendance, fee management,
          exam scheduling, and more.
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 bg-teal-50 overflow-hidden" shadow={false}>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Attendance Management
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Effortlessly track and manage student attendance with real-time
              insights and reports.
            </Typography>
            <img
              src="/src/assets/attendence-removebg-preview.png"
              alt="attendance"
              className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center"
            />
          </CardBody>
        </Card>
        <Card
          className="col-span-2 bg-[#FEEFDC] overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Fee Management
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Automate fee collection and streamline the payment process for
              parents and administrators.
            </Typography>
            <img
              src="/src/assets/fee_management.jpg"
              alt="fee management"
              className="w-full lg:h-[380px] md:h-[300px] h-[220px] lg:translate-y-16 translate-y-10 object-cover object-center"
            />
          </CardBody>
        </Card>
      </div>
      <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-2 bg-gray-100 overflow-hidden" shadow={false}>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Exam Scheduling
            </Typography>
            <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500">
              Simplify exam schedules with intuitive tools for better planning
              and communication.
            </Typography>
            <img
              src="/src/assets/4677878.webp"
              alt="exam scheduling"
              className="w-1/2 mx-auto xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-cover object-top"
            />
          </CardBody>
        </Card>
        <Card className="col-span-1 bg-gray-100" shadow={false}>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Join Our Community
            </Typography>
            <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Become a part of our community and experience the benefits of our
              comprehensive school management system.
            </Typography>
            <div className="flex items-center -space-x-4 justify-center mt-24">
              <Avatar
                size="xl"
                variant="circular"
                alt="user 1"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <Avatar
                size="xl"
                variant="circular"
                alt="user 2"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
              <Avatar
                size="xl"
                variant="circular"
                alt="user 3"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
              />
              <Avatar
                size="xl"
                variant="circular"
                alt="user 4"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default FeatureSection;
