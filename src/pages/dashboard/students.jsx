import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useGetAllStudentsQuery } from "../../redux/api/studentApi";

export const Students = () => {
  const { data } = useGetAllStudentsQuery();
  console.log(data);
  return (
    <div>
      {data?.map((item) => (
        <Card className="mt-6 w-96" key={item._id}>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.name}
            </Typography>
            <Typography variant="p" color="blue-gray" className="mb-2">
              ID: {item.studentId}
            </Typography>
            <Typography>
              Class: {item.class ? item.class.name : "No class"}
            </Typography>
            <Typography>
              Password : {item.password ? item.password : "No password"}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Students;
