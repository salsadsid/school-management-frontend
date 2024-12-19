import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { Checkbox } from "@material-tailwind/react";

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
        Father Name
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
  {
    accessorKey: "presentAddress",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Present Address
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
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
];
