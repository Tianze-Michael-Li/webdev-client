"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};
export default function WorkingWithRemoteObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .fetchAssignment()
      .then(setAssignment)
      .catch(() => setError("Unable to fetch assignment"));
  }, []);
  const updateTitle = async () => {
    if (!assignment) return;
    try {
      setAssignment(await client.updateTitle(assignment.title));
    } catch {
      setError("Unable to update assignment");
    }
  };
  return (
    <div id="wd-working-with-remote-objects-async">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      {assignment && (
        <>
          <input
            aria-label="Asynchronous assignment title"
            className="mb-2 block rounded border px-3 py-1.5"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
          <input
            aria-label="Asynchronous assignment score"
            className="mb-2 block rounded border px-3 py-1.5"
            type="number"
            value={assignment.score}
            onChange={(e) =>
              setAssignment({ ...assignment, score: Number(e.target.value) })
            }
          />
          <label className="me-2">
            <input
              type="checkbox"
              checked={assignment.completed}
              onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked })
              }
            />{" "}
            Completed
          </label>
          <button
            type="button"
            className="rounded bg-blue-600 px-3 py-1.5 text-white"
            onClick={updateTitle}
          >
            Update Title
          </button>
          <pre>{JSON.stringify(assignment, null, 2)}</pre>
        </>
      )}
      {error && <p className="text-red-800">{error}</p>}
    </div>
  );
}
