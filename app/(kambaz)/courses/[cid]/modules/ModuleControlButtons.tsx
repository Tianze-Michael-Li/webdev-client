import { useState } from "react";
import * as client from "../../client";
import { FaCheckCircle, FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useModulesStore } from "../../../store/modulesStore";

export default function ModuleControlButtons({
  moduleId,
}: {
  moduleId: string;
}) {
  const deleteModule = useModulesStore((state) => state.deleteModule);
  const editModule = useModulesStore((state) => state.editModule);
  const [error, setError] = useState("");
  const onRemoveModule = async () => {
    try {
      await client.deleteModule(moduleId);
      deleteModule(moduleId);
    } catch {
      setError("Unable to delete module");
    }
  };
  return (
    <div className="flex items-center gap-2">
      {error && (
        <span role="alert" className="text-sm text-red-800">
          {error}
        </span>
      )}
      <FaPencilAlt
        className="cursor-pointer text-blue-600"
        onClick={() => editModule(moduleId)}
        title="Edit module"
      />
      <FaTrash
        className="cursor-pointer text-red-600"
        onClick={onRemoveModule}
        title="Delete module"
      />
      <FaCheckCircle className="text-green-600" />
      <BsPlus className="text-3xl" />
      <IoEllipsisVertical className="text-xl" />
    </div>
  );
}
