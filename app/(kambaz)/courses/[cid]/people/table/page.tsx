"use client";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  emptyUser,
  useAccountContext,
  type User,
} from "../../../../account/AccountContext";
import * as client from "../../../../account/client";
import { unenrollFromCourse } from "../../../client";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useAccountContext();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .findUsersForCourse(cid)
      .then(setUsers)
      .catch(() => setError("Unable to load people"));
  }, [cid]);
  const [person, setPerson] = useState<User>(emptyUser);
  const [showEditor, setShowEditor] = useState(false);
  const canEdit =
    !currentUser ||
    currentUser.role === "FACULTY" ||
    currentUser.role === "ADMIN";
  const save = async () => {
    if (!person.username.trim()) return;
    try {
      if (person._id) await client.updateUser(person);
      else await client.createUserForCourse(cid, person);
      setUsers(await client.findUsersForCourse(cid));
      setShowEditor(false);
    } catch {
      setError("Unable to save person");
    }
  };
  const removePerson = async (userId: string) => {
    try {
      await unenrollFromCourse(userId, cid);
      setUsers(await client.findUsersForCourse(cid));
    } catch {
      setError("Unable to remove person");
    }
  };
  return (
    <div id="wd-people-table" className="overflow-x-auto">
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      {canEdit && (
        <button
          id="wd-add-person"
          className="mb-3 rounded bg-red-600 px-3 py-2 text-white"
          onClick={() => {
            setPerson(emptyUser);
            setShowEditor(true);
          }}
        >
          + People
        </button>
      )}
      {showEditor && (
        <div
          role="dialog"
          aria-label="Person editor"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="rounded bg-white p-5 shadow-lg">
            <h3>{person._id ? "Edit person" : "Add person"}</h3>
            {(
              [
                "username",
                "firstName",
                "lastName",
                "email",
                "loginId",
                "section",
              ] as const
            ).map((field) => (
              <label key={field} className="block">
                {field}
                <input
                  className="m-1 rounded border px-2 py-1"
                  value={person[field]}
                  onChange={(e) =>
                    setPerson({ ...person, [field]: e.target.value })
                  }
                />
              </label>
            ))}
            <label>
              Role
              <select
                value={person.role}
                onChange={(e) => setPerson({ ...person, role: e.target.value })}
              >
                <option>STUDENT</option>
                <option>TA</option>
                <option>FACULTY</option>
              </select>
            </label>
            <div className="mt-3">
              <button
                className="me-2 rounded border px-3 py-2"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-blue-600 px-3 py-2 text-white"
                onClick={save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="p-2">Name</th>
            <th className="p-2">Login ID</th>
            <th className="p-2">Section</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Activity</th>
            <th className="p-2">Total Activity</th>
            {canEdit && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="odd:bg-neutral-50">
              <td className="wd-full-name p-2 text-nowrap">
                <FaUserCircle className="me-2 inline align-middle text-3xl text-neutral-500" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id p-2">{user.loginId}</td>
              <td className="wd-section p-2">{user.section}</td>
              <td className="wd-role p-2">{user.role}</td>
              <td className="wd-last-activity p-2">{user.lastActivity}</td>
              <td className="wd-total-activity p-2">{user.totalActivity}</td>
              {canEdit && (
                <td className="p-2">
                  <button
                    className="me-2 rounded bg-yellow-400 px-2 py-1"
                    onClick={() => {
                      setPerson(user);
                      setShowEditor(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-600 px-2 py-1 text-white"
                    onClick={() => removePerson(user._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
