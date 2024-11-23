import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useGetClassesQuery } from "../../redux/api/classApi";

export const Classes = () => {
  const { data } = useGetClassesQuery();
  console.log(data);
  return (
    <div>
      {data?.map((item) => (
        <Card className="mt-6 w-96" key={item._id}>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.name}
            </Typography>
            <Typography>
              {item.description ? item.description : "No description"}
            </Typography>
            <Typography>
              Class teacher: {item.teacher ? item.teacher.email : "No teacher"}
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

export default Classes;
