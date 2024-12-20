import { Alert } from "@material-tailwind/react";
import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { useGetClassesQuery } from "../../redux/api/classApi";

export const Classes = () => {
  const { data } = useGetClassesQuery();
  const [openAlert, setOpenAlert] = React.useState(true);
  console.log(data);
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-12 md:py-12 min-h-[82vh]">
      <Alert open={openAlert} color="amber" onClose={() => setOpenAlert(true)}>
        <div className="flex items-center gap-4">
          <RiAdminFill />
          <p className="text-sm ">You are not authorized to view this page.</p>
        </div>
      </Alert>
      {/* {data?.map((item) => (
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
      ))} */}
    </div>
  );
};

export default Classes;
