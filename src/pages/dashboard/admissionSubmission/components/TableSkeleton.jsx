import { Typography } from "@material-tailwind/react";
import React from "react";

export function TableSkeleton() {
  return (
    <div className="max-w-full animate-pulse">
      <div className="mb-4">
        <Typography
          as="div"
          variant="h1"
          className="h-3 w-56 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 5 }).map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <Typography
                    as="div"
                    variant="paragraph"
                    className="h-2 w-full rounded-full bg-gray-300"
                  >
                    &nbsp;
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="h-2 w-full rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSkeleton;
