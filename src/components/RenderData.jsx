import { Alert } from "@material-tailwind/react";
import { AiOutlineLoading } from "react-icons/ai";
import { cn } from "../utils/cn";

const RenderData = ({
  data,
  apiState,
  children,
  loadingComponent = null,
  errorMessage,
  fetchingComponent = null,
  fetchingWithChildren = false,
  isFetchingAsLoading,
  noContentFound = {
    beforeContent: null,
    message: "Nothing to show here",
    afterContent: null,
  },
  classNames = {
    loadingContainer: "",
    loadingIcon: "",
  },
}) => {
  const { isError, isSuccess, isLoading, isFetching, error } = apiState || {};

  const defaultLoadingUi = (
    <div
      className={cn(
        "my-4 flex h-full w-full items-center justify-center",
        classNames?.loadingContainer
      )}
    >
      <AiOutlineLoading
        className={cn(
          "transition-linear h-8 w-8 !animate-spin text-[#0584FE] dark:text-[#19A3FE]",
          classNames?.loadingIcon
        )}
      />
    </div>
  );

  if (isLoading) {
    if (loadingComponent) {
      return loadingComponent;
    }

    return defaultLoadingUi;
  }

  if (isFetching) {
    if (isFetchingAsLoading) {
      if (loadingComponent) {
        return loadingComponent;
      }

      return defaultLoadingUi;
    }

    if (fetchingComponent) {
      if (fetchingWithChildren) {
        return (
          <>
            {fetchingComponent}
            {children}
          </>
        );
      }
      return fetchingComponent;
    }

    return (
      <>
        <Alert severity="info">Fetching new data...</Alert>
        {children}
      </>
    );
  }

  if (isError) {
    const errorMsg = errorMessage
      ? errorMessage
      : error?.error || error?.data?.detail || "Something went wrong";
    return <Alert severity="error">{errorMsg}</Alert>;
  }

  if (isSuccess && Array.isArray(data) ? !data?.length : !data) {
    return (
      <div>
        {noContentFound?.beforeContent ? noContentFound?.beforeContent : null}
        <Alert severity="info">
          {noContentFound?.message || "Nothing to show here"}
        </Alert>
        {noContentFound?.afterContent ? noContentFound?.afterContent : null}
      </div>
    );
  }

  return <>{children}</>;
};

export default RenderData;
