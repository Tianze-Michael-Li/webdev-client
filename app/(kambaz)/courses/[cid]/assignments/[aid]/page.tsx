import Link from "next/link";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid } = await params;
  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      <label className="mb-2 block font-medium" htmlFor="wd-name">
        Assignment Name
      </label>
      <input
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
      />
      <label className="mb-2 block font-medium" htmlFor="wd-description">
        Description
      </label>
      <textarea
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-description"
        rows={5}
        cols={60}
        defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Vercel."
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
              defaultValue={100}
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
              defaultValue="2026-05-13"
            />
            <label htmlFor="wd-available-from">Available from</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="date"
              id="wd-available-from"
              defaultValue="2026-05-06"
            />
            <label htmlFor="wd-available-until">Until</label>
            <input
              className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
              type="date"
              id="wd-available-until"
              defaultValue="2026-05-13"
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
      <Link
        className="inline-block rounded bg-red-600 px-4 py-2 text-white no-underline"
        id="wd-save"
        href={`/courses/${cid}/assignments`}
      >
        Save
      </Link>
    </div>
  );
}
