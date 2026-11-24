import { useState } from "react";
import * as client from "../../client";
import {
  useModulesStore,
  type CourseModule,
} from "../../../store/modulesStore";
import ModuleControlButtons from "./ModuleControlButtons";
import Lesson from "./Lesson";
export default function Module({ module }: { module: CourseModule }) {
  const updateModule = useModulesStore((state) => state.updateModule);
  const [error, setError] = useState("");
  const onUpdateModule = async () => {
    try {
      updateModule(await client.updateModule({ ...module, editing: false }));
    } catch {
      setError("Unable to update module");
    }
  };
  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2">
        {module.editing ? (
          <input
            className="w-1/2 rounded border border-neutral-300 px-2 py-1 text-black"
            value={module.name}
            onChange={(e) => updateModule({ ...module, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") onUpdateModule();
            }}
          />
        ) : (
          <span>{module.name}</span>
        )}
        <ModuleControlButtons moduleId={module._id} />
      </div>
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <ul className="wd-lessons m-0 list-none p-0">
        {module.lessons?.map((lesson) => (
          <Lesson key={lesson._id} title={lesson.name} />
        ))}
      </ul>
    </li>
  );
}
