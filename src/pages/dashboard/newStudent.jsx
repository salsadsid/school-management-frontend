import { Card } from "@material-tailwind/react";
import React from "react";
import NewStudentForm from "../../components/Forms/NewStudentForm";
import { useGetClassesQuery } from "../../redux/api/classApi";
import { useGetSectionsQuery } from "../../redux/api/sectionApi";
export const NewStudent = () => {
  const {
    data: classes,
    isLoading: isClassesLoading,
    error,
  } = useGetClassesQuery();
  const { data: sections, isLoading: isSectionsLoading } =
    useGetSectionsQuery();
  return (
    <div>
      <div className="mx-auto min-h-[82vh] max-w-screen-xl px-4 md:px-12 md:py-12">
        <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
          {classes?.length > 0 ? (
            <NewStudentForm classes={classes} sections={sections} />
          ) : (
            <div className="p-4 text-center font-bold text-2xl">
              No Class or Section Found, Please create a class and section
              first.
            </div>
          )}
          {isClassesLoading && isSectionsLoading && (
            <div className="p-4 text-center font-bold text-2xl">Loading...</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default NewStudent;
