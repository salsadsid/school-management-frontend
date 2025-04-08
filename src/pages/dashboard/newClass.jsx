import { Card } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import NewClassForm from "../../components/Forms/NewClassForm";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import { useGetTeachersQuery } from "../../redux/api/teacherApi";

export const NewClass = () => {
  const location = useLocation();
  const { data: teachers, isLoading: isTeachersLoading } =
    useGetTeachersQuery();
  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-12 md:py-12">
      <Card className=" p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        {teachers?.length > 0 && <NewClassForm teachers={teachers} />}
        {isTeachersLoading && <div>Loading...</div>}
        {!teachers?.length && !isTeachersLoading && (
          <div className="p-4 text-center font-bold text-2xl">
            Please create a teacher first.
          </div>
        )}
      </Card>
    </div>
  );
};

export default NewClass;
