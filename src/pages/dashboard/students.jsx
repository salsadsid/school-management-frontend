import { Alert } from "@material-tailwind/react";
import React from "react";
import { useGetAllStudentsQuery } from "../../redux/api/studentApi";
import { RiAdminFill } from "react-icons/ri";

export const Students = () => {
  const { data } = useGetAllStudentsQuery();
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
      ))} */}
    </div>
  );
};

export default Students;
