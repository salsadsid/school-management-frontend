import { Card } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import NewSectionForm from "../../components/Forms/NewSectionForm";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import { useGetClassesQuery } from "../../redux/api/classApi";

export const NewSection = () => {
  const location = useLocation();
  const { data = [], isLoading, isError } = useGetClassesQuery();
  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }
  return (
    <div className="mx-auto max-w-screen-xl min-h-[80vh] px-4 md:px-12 md:py-12">
      <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        {data?.length > 0 ? (
          <NewSectionForm classes={data} />
        ) : (
          <div className="p-4 text-center font-bold text-2xl">
            No Class Found, Please create a class first.
          </div>
        )}
        {isLoading && (
          <div className="p-4 text-center font-bold text-2xl">Loading...</div>
        )}
      </Card>
    </div>
  );
};

export default NewSection;
