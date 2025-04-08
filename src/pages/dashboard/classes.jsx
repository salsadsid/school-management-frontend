import { PencilIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import Loading from "../../components/Loading/Loading";
import RenderData from "../../components/RenderData";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import { useGetClassesQuery } from "../../redux/api/classApi";

const StudentsModal = ({ students, open, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <Dialog open={open} handler={handleClose} size="lg">
      <DialogHeader className="flex justify-between items-center">
        Students List ({students.length})
        <div className="w-72">
          <Input
            label="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {paginatedStudents.map((student) => (
            <div
              key={student._id}
              className="flex items-center p-2 hover:bg-gray-50 rounded"
            >
              <UserIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span className="text-gray-700">{student.name}</span>
            </div>
          ))}
        </div>
        {filteredStudents.length === 0 && (
          <Typography className="text-center text-gray-500 py-4">
            No students found matching your search.
          </Typography>
        )}
      </DialogBody>
      <DialogFooter className="flex justify-between items-center">
        <Typography variant="small" className="text-gray-600">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="space-x-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            Next
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export const Classes = () => {
  const { data, ...classesApiState } = useGetClassesQuery();
  const location = useLocation();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }
  const { isLoading } = classesApiState;
  if (isLoading) return <Loading />;

  const handleStudentsView = (students) => {
    setSelectedStudents(students);
    setModalOpen(true);
  };

  const handleEdit = (classId) => {
    navigate(`/dashboard/classes-new?classId=${classId}`);
  };
  return (
    <div className="mx-auto px-4 md:px-12 py-8 min-h-[82vh]">
      <RenderData data={data} apiState={classesApiState}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {data?.length > 0 ? (
            data?.map((item) => (
              <Card
                key={item._id}
                className="shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
              >
                <CardBody className="flex flex-col gap-3">
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 truncate"
                  >
                    {item.name}
                  </Typography>

                  <div className="flex mt-4 items-center gap-2 text-gray-700">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">
                      Class Teacher: <br />
                      <span className="font-medium">
                        {item.teacher?.name || "Not assigned"}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <UsersIcon className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Students:{" "}
                      <span className="font-medium">
                        {item.students?.length || 0}
                      </span>
                    </span>
                  </div>
                </CardBody>

                <CardFooter className="pt-0 flex justify-between items-center">
                  <Button
                    onClick={() => handleEdit(item._id)}
                    variant="gradient"
                    size="sm"
                    color="blue"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    color="green"
                    onClick={() => handleStudentsView(item.students || [])}
                    disabled={!item.students?.length}
                  >
                    View Students
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Typography variant="h4" className="text-gray-500">
                No classes found
              </Typography>
            </div>
          )}
        </div>
      </RenderData>

      <StudentsModal
        students={selectedStudents}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Classes;
