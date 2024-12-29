import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useLocation } from "react-router-dom";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import { useGetClassesQuery } from "../../redux/api/classApi";

export const Classes = () => {
  const { data } = useGetClassesQuery();
  const location = useLocation();
  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }

  return (
    <div className="mx-auto  px-4 md:px-12 md:py-12 min-h-[82vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.length > 0 ? (
        data?.map((item) => (
          <Card className="shadow-lg rounded-lg" key={item._id}>
            <CardBody className="flex flex-col items-start">
              {/* Class Name */}
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-3 font-semibold"
              >
                {item.name}
              </Typography>

              {/* Description */}
              <Typography className="text-gray-600 mb-3">
                {item.description
                  ? item.description
                  : "No description available."}
              </Typography>

              {/* Teacher Info */}
              <Typography className="text-gray-800 font-medium mb-3">
                Class Teacher:{" "}
                <span className="text-blue-500">
                  {item.teacher ? item.teacher.name : "Not Assigned"}
                </span>
              </Typography>

              {/* Students */}
              {item?.students?.length > 0 ? (
                <div className="w-full">
                  <Typography className="font-medium mb-2">
                    Students:
                  </Typography>
                  <ul className="list-disc list-inside text-gray-700">
                    {item.students.map((student) => (
                      <li key={student._id} className="text-sm">
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Typography className="text-gray-500">
                  No students enrolled yet.
                </Typography>
              )}
            </CardBody>

            {/* Footer */}
            <CardFooter className="pt-0 flex justify-end">
              <Button
                variant="gradient"
                size="sm"
                className="bg-blue-500 text-white"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-3 font-semibold"
        >
          No classes found.
        </Typography>
      )}
    </div>
  );
};

export default Classes;
