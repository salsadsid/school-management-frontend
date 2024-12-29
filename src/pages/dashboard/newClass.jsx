import { Card } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import NewClassForm from "../../components/Forms/NewClassForm";
import { restrictedRoutes } from "../../configs/systemConfiguration";

export const NewClass = () => {
  const location = useLocation();
  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }

  return (
    <div className="mx-auto max-w-screen-xl min-h-[80vh] px-4 md:px-12 md:py-12">
      <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <NewClassForm />
      </Card>
    </div>
  );
};

export default NewClass;
