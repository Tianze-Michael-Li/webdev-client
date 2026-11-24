"use client";
import { useEffect, useState } from "react";
import * as client from "../../client";
import { useParams } from "next/navigation";
import Module from "./Module";
import ModulesControls from "./ModulesControls";
import { useModulesStore } from "../../../store/modulesStore";
export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = useModulesStore((state) => state.modules);
  const setModules = useModulesStore((state) => state.setModules);
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .findModulesForCourse(cid)
      .then(setModules)
      .catch(() => setError("Unable to load modules"));
  }, [cid, setModules]);
  return (
    <div>
      <ModulesControls />
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <ul id="wd-modules" className="m-0 list-none p-0">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <Module key={module._id} module={module} />
          ))}
      </ul>
    </div>
  );
}
