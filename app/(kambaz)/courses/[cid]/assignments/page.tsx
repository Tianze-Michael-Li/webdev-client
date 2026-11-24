"use client";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";
import * as client from "../../client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssignmentsStore } from "../../../store/assignmentsStore";
import { useAccountContext } from "../../../account/AccountContext";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const setAssignments = useAssignmentsStore((state) => state.setAssignments);
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .findAssignmentsForCourse(cid)
      .then(setAssignments)
      .catch(() => setError("Unable to load assignments"));
  }, [cid, setAssignments]);
  const allAssignments = useAssignmentsStore((state) => state.assignments);
  const deleteAssignment = useAssignmentsStore(
    (state) => state.deleteAssignment,
  );
  const { currentUser } = useAccountContext();
  const canEdit =
    !currentUser ||
    currentUser.role === "FACULTY" ||
    currentUser.role === "ADMIN";
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const assignments = allAssignments.filter((a) => a.course === cid);
  return (
    <div id="wd-assignments">
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="rounded border py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <button
              id="wd-add-assignment-group"
              type="button"
              className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm"
            >
              <FaPlus /> Group
            </button>
            <button
              id="wd-add-assignment"
              onClick={() => router.push(`/courses/${cid}/assignments/new`)}
              type="button"
              className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
            >
              <FaPlus /> Assignment
            </button>
          </div>
        )}
      </div>
      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>
        <button
          type="button"
          className="inline-flex items-center rounded border bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>
      </h3>
      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {assignments.map((assignment) => (
          <AssignmentItem
            key={assignment._id}
            cid={cid}
            aid={assignment._id}
            onDelete={canEdit ? () => setDeletingId(assignment._id) : undefined}
            title={assignment.title}
            details={`Multiple Modules | Not available until ${assignment.available} | Due ${assignment.due} | ${assignment.points} pts`}
          />
        ))}
      </ul>
      {deletingId && (
        <div
          role="dialog"
          aria-label="Delete assignment"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="rounded bg-white p-5 shadow-lg">
            <h3>Delete Assignment</h3>
            <p>Are you sure you want to remove this assignment?</p>
            <button
              id="wd-cancel-delete-assignment"
              className="me-2 rounded border px-3 py-2"
              onClick={() => setDeletingId(null)}
            >
              Cancel
            </button>
            <button
              id="wd-confirm-delete-assignment"
              className="rounded bg-red-600 px-3 py-2 text-white"
              onClick={async () => {
                try {
                  await client.deleteAssignment(deletingId);
                } catch {
                  setError("Unable to delete assignment");
                  return;
                }
                deleteAssignment(deletingId, cid);
                setDeletingId(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
