import qs from "query-string";

export const generateQueryString = ({ queryObject, options }) => {
  let queryString = qs.stringify(queryObject, options);
  queryString = queryString ? `?${queryString}` : "";

  return { queryString };
};
