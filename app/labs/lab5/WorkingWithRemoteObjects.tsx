"use client";
import { useState } from "react";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithRemoteObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    name: "Introduction to Node.js",
    description: "Creating an Express server",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-remote-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <a
          id="wd-update-assignment-title"
          href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}
        >
          Update Title
        </a>
        <input
          id="wd-assignment-title"
          className="rounded border px-3 py-1.5"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>
      <div className="my-2 flex items-center gap-2">
        <a
          id="wd-update-assignment-score"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <input
          id="wd-assignment-score"
          className="rounded border px-3 py-1.5"
          type="number"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
      </div>
      <a
        id="wd-update-assignment-completed"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>{" "}
      <input
        id="wd-assignment-completed"
        type="checkbox"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <h4>Module (On Your Own)</h4>
      <a id="wd-retrieve-module" href={MODULE_API_URL}>
        Get Module
      </a>{" "}
      <a id="wd-retrieve-module-name" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <a
          id="wd-update-module-name"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(module.name)}`}
        >
          Update Module Name
        </a>
        <input
          id="wd-module-name"
          className="rounded border px-3 py-1.5"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
      </div>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <a
          id="wd-update-module-description"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`}
        >
          Update Module Description
        </a>
        <input
          id="wd-module-description"
          className="rounded border px-3 py-1.5"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
      </div>
    </div>
  );
}
