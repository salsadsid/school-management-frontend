import { useSearchParams } from "react-router-dom";

function useManageQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const readQueryParam = (key) => {
    return searchParams.get(key);
  };

  const readMultipleQueryParam = (keys = []) => {
    const params = {};
    keys?.forEach((key) => {
      if (key) params[key] = searchParams.get(key);
    });
    return params;
  };

  const readAllQueryParam = () => {
    const params = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const updateQueryParam = ({ key, value }) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    if (key) {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }
    setSearchParams(newSearchParams);
  };

  const updateMultipleQueryParam = (params = {}) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params ?? {})?.forEach(([key, value]) => {
      if (key) {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      }
    });
    setSearchParams(newSearchParams);
  };

  const createQueryParam = ({ key, value }) => {
    if (key) {
      if (!searchParams.has(key)) {
        updateQueryParam({ key, value });
      }
    }
  };

  const createMultipleQueryParam = (params = {}) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params ?? {})?.forEach(([key, value]) => {
      if (key) {
        if (!searchParams.has(key)) {
          newSearchParams.set(key, value);
        }
      }
    });
    setSearchParams(newSearchParams);
  };

  const deleteQueryParam = (key) => {
    if (key) {
      if (searchParams.has(key)) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(key);
        setSearchParams(newSearchParams);
      }
    }
  };

  const deleteMultipleQueryParam = (keys) => {
    const newSearchParams = new URLSearchParams(searchParams);
    keys?.forEach((key) => {
      if (key) {
        if (newSearchParams.has(key)) {
          newSearchParams.delete(key);
        }
      }
    });
    setSearchParams(newSearchParams);
  };

  const deleteAllQueryParam = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    readQueryParam,
    readMultipleQueryParam,
    readAllQueryParam,
    updateQueryParam,
    updateMultipleQueryParam,
    createQueryParam,
    createMultipleQueryParam,
    deleteQueryParam,
    deleteMultipleQueryParam,
    deleteAllQueryParam,
  };
}

export default useManageQueryParams;
