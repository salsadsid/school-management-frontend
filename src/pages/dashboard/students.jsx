import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { useGetAllStudentsQuery } from "../../redux/api/studentApi";

export const Students = () => {
  const { data } = useGetAllStudentsQuery();
  console.log(data);
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-12 md:py-12 min-h-[82vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.length > 0 ? (
        data?.map((item) => (
          <Card
            key={item._id}
            className="shadow-xl rounded-lg overflow-hidden border border-gray-200 bg-white"
          >
            {/* Card Header */}
            <div className="bg-blue-500 text-white p-4">
              <Typography variant="h5" className="font-bold">
                {item.name}
              </Typography>
            </div>

            {/* Card Body */}
            <CardBody className="p-6">
              <Typography className="mb-4 text-gray-800">
                <span className="font-semibold">Roll Number:</span>{" "}
                {item.studentId ? item.studentId : "Not assigned"}
              </Typography>
              <Typography className="mb-4 text-gray-800">
                <span className="font-semibold">Roll Number:</span>{" "}
                {item.rollNumber ? item.rollNumber : "Not assigned"}
              </Typography>

              <Typography className="mb-4 text-gray-800">
                <span className="font-semibold">Class:</span>{" "}
                {item.classId ? item.classId.name : "No class"}
              </Typography>

              <Typography className="mb-4 text-gray-800">
                <span className="font-semibold">Section:</span>{" "}
                {item.section ? item.section.name : "No section"}
              </Typography>

              <Typography className="text-gray-600">
                <span className="font-semibold">Admission Date:</span>{" "}
                {new Date(item.admissionDate).toLocaleDateString()}
              </Typography>
            </CardBody>

            {/* Card Footer */}
            <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <Button variant="gradient" color="blue" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Typography variant="h5" className="text-center">
          No Students Found
        </Typography>
      )}
    </div>
  );
};

export default Students;
