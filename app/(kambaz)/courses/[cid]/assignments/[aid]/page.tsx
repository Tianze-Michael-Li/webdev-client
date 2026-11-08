"use client";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  emptyAssignment,
  useAssignmentsStore,
  type Assignment,
} from "../../../../store/assignmentsStore";
import { useAccountContext } from "../../../../account/AccountContext";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignments = useAssignmentsStore((state) => state.assignments);
  const assignment = assignments.find((a) => a._id === aid && a.course === cid);
  return (
    <EditorForm
      key={`${cid}/${aid}`}
      cid={cid}
      aid={aid}
      initial={assignment}
    />
  );
}
function EditorForm({
  cid,
  aid,
  initial,
}: {
  cid: string;
  aid: string;
  initial?: Assignment;
}) {
  const [assignment, setAssignment] = useState(
    initial ?? { ...emptyAssignment, course: cid },
  );
  const addAssignment = useAssignmentsStore((state) => state.addAssignment);
  const updateAssignment = useAssignmentsStore(
    (state) => state.updateAssignment,
  );
  const { currentUser } = useAccountContext();
  const canEdit =
    !currentUser ||
    currentUser.role === "FACULTY" ||
    currentUser.role === "ADMIN";
  const router = useRouter();
  const save = () => {
    if (!canEdit) return;
    if (aid === "new") addAssignment({ ...assignment, course: cid });
    else if (initial)
      updateAssignment({ ...assignment, course: cid, _id: aid });
    router.push(`/courses/${cid}/assignments`);
  };
  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      <label className="mb-2 block font-medium" htmlFor="wd-name">
        Assignment Name
      </label>
      <input
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-name"
        value={assignment.title}
        readOnly={!canEdit}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <p>Assignment id: {aid}</p>
      <label className="mb-2 block font-medium" htmlFor="wd-description">
        Description
      </label>
      <textarea
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-description"
        rows={5}
        cols={60}
        value={assignment.description}
        readOnly={!canEdit}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <div className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="pt-2 sm:text-right">
            <label htmlFor="wd-points">Points</label>
          </div>
          <div>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="number"
              id="wd-points"
              value={assignment.points}
              readOnly={!canEdit}
              onChange={(e) =>
                setAssignment({ ...assignment, points: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="pt-2 sm:text-right">
            <label htmlFor="wd-group">Assignment Group</label>
          </div>
          <div>
            <select
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              id="wd-group"
              defaultValue="ASSIGNMENTS"
            >
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="pt-2 sm:text-right">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </div>
          <div>
            <select
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              id="wd-display-grade-as"
              defaultValue="Percentage"
            >
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
              <option>Letter Grade</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="pt-2 sm:text-right">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </div>
          <div>
            <select
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              id="wd-submission-type"
              defaultValue="Online"
            >
              <option>Online</option>
              <option>No Submission</option>
              <option>On Paper</option>
              <option>External Tool</option>
            </select>
            <h4>Online Entry Options</h4>
            <input
              className="me-2 accent-blue-600"
              type="checkbox"
              id="wd-text-entry"
            />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input
              className="me-2 accent-blue-600"
              type="checkbox"
              id="wd-website-url"
              defaultChecked
            />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              className="me-2 accent-blue-600"
              type="checkbox"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              className="me-2 accent-blue-600"
              type="checkbox"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input
              className="me-2 accent-blue-600"
              type="checkbox"
              id="wd-file-upload"
            />
            <label htmlFor="wd-file-upload">File Uploads</label>
            <br />
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="pt-2 sm:text-right">Assign</div>
          <div>
            <label htmlFor="wd-assign-to">Assign to</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              id="wd-assign-to"
              defaultValue="Everyone"
            />
            <label htmlFor="wd-due-date">Due</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="date"
              id="wd-due-date"
              value={assignment.due}
              readOnly={!canEdit}
              onChange={(e) =>
                setAssignment({ ...assignment, due: e.target.value })
              }
            />
            <label htmlFor="wd-available-from">Available from</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="date"
              id="wd-available-from"
              value={assignment.available}
              readOnly={!canEdit}
              onChange={(e) =>
                setAssignment({ ...assignment, available: e.target.value })
              }
            />
            <label htmlFor="wd-available-until">Until</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="date"
              id="wd-available-until"
              value={assignment.until}
              readOnly={!canEdit}
              onChange={(e) =>
                setAssignment({ ...assignment, until: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <label className="mb-2 block font-medium" htmlFor="wd-ai-editor-notes">
        Sample notes
      </label>
      <textarea
        id="wd-ai-editor-notes"
        rows={3}
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <hr className="my-5" />
      <Link
        className="inline-block rounded border border-neutral-300 bg-neutral-100 px-4 py-2 text-black no-underline"
        id="wd-cancel"
        href={`/courses/${cid}/assignments`}
      >
        Cancel
      </Link>{" "}
      {canEdit && (
        <button
          type="button"
          className="inline-block rounded bg-red-600 px-4 py-2 text-white"
          id="wd-save"
          onClick={save}
        >
          Save
        </button>
      )}
    </div>
  );
}
