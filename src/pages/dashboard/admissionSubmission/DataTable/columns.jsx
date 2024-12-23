import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { Checkbox, Tooltip } from "@material-tailwind/react";
import {
  admissionTypes,
  branches,
  classes,
} from "../../../../configs/constOptions";
import ApplicationModal from "../components/ViewApplication";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        aria-label="Select all"
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => {
          if (row.getIsSelected()) {
            row.toggleSelected(false);
          } else row.toggleSelected(value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "admissionType",
    header: ({ column }) => (
      <button
        className="outline-none rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      const findAdmissionType = admissionTypes.find(
        (c) => c.value === row.original["admissionType"]
      );
      return <p>{findAdmissionType.label}</p>;
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Branch
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      const findBranch = branches.find(
        (c) => c.value === row.original["branch"]
      );
      return <p>{findBranch.label.split(" ")[0]}</p>;
    },
  },
  {
    accessorKey: "applicationId",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },

  {
    accessorKey: "class",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Class
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      const findClass = classes.find((c) => c.value === row.original["class"]);
      return <p>{findClass.label}</p>;
    },
  },
  {
    accessorKey: "session",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Session
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "fatherName",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Father&apos;s Name
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  //   {
  //     accessorKey: "motherName",
  //     header: ({ column }) => (
  //       <button
  //         className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Mother Name
  //         <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
  //       </button>
  //     ),
  //   },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date of Birth
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      let d = new Date(row.original["dateOfBirth"]);
      return (
        <p>
          {d
            .toDateString()
            .split(" ")
            .filter((di, i) => i !== 0)
            .join(" ")}
        </p>
      );
    },
  },

  // {
  //   accessorKey: "presentAddress",
  //   header: ({ column }) => (
  //     <button
  //       className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Present Address
  //       <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
  //     </button>
  //   ),
  // },
  {
    accessorKey: "permanentAddress",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Permanent Address
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      let address = row.original["permanentAddress"];
      return (
        <p title={address}>
          {address?.length > 20 ? (
            <Tooltip content={address}>
              {address.substring(0, 20) + "..."}
            </Tooltip>
          ) : (
            address
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      let status = row.original["status"];
      return (
        <p>
          {status === "pending" ? (
            <span className="text-yellow-800 bg-yellow-50 p-1 rounded">
              Pending
            </span>
          ) : status === "approved" ? (
            <span className="text-green-500 bg-green-50 p-1 rounded">
              Approved
            </span>
          ) : (
            <span className="text-red-500 bg-red-50 p-1 rounded">Rejected</span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "Action",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Actions
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
    cell: ({ row }) => {
      return <ApplicationModal row={row.original} />;
    },
  },
  //   {
  //     accessorKey: "emergencyContactNo",
  //     header: ({ column }) => (
  //       <button
  //         className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Emergency Contact No
  //         <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
  //       </button>
  //     ),
  //   },
  // {
  //   accessorKey: "Action",
  //   show: false,
  //   header: ({ column }) => {
  //     return (
  //       <button
  //         className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Actions
  //         <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
  //       </button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     //TODO
  //     // console.log(row);
  //     return <DeleteAnApplication />;
  //   },
  // },
];
