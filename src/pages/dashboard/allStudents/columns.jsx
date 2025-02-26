import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { ActionButtons } from "./components/ActionButtons";

export const studentColumns = [
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <button
        className="outline-none rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student ID
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "rollNumber",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Roll
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "classId.name",
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
    accessorKey: "phoneNumber1",
    header: ({ column }) => (
      <button
        className="outline-none  rounded px-2 py-1 hover:bg-gray-100 font-normal text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowsUpDownIcon className="ml-2 h-4 w-4 inline" />
      </button>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        student={row.original}
        onEdit={(student) => console.log("Edit:", student)} // Replace with your edit handler
        onDelete={(student) => console.log("Delete:", student)} // Replace with your delete handler
      />
    ),
    enableSorting: false,
  },
];
