import { InformationCircleIcon } from "@heroicons/react/16/solid";

export default function FormValidationError({ errorMessage }) {
  return (
    <span className="text-red-500 text-xs mt-1 font-medium inline-flex items-center gap-1">
      <InformationCircleIcon className="h-4 w-4 inline-block " />
      {errorMessage}
    </span>
  );
}
