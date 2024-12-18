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
            {item?.students?.length > 0 && (
              <div>
                <Typography>Students:</Typography>
                {item?.students.map((student) => (
                  <Typography key={student._id}>{student.name}</Typography>
                ))}
              </div>
            )}
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
