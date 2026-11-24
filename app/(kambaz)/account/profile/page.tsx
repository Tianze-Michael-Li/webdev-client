"use client";

import * as client from "../client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    // Chapter 4 copies the signed-in user into the editable form in this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(currentUser);
  }, [currentUser, router]);

  const [error, setError] = useState("");
  const signout = async () => {
    try {
      await client.signout();
    } catch {
      setError("Unable to sign out");
      return;
    }
    setCurrentUser(null);
    router.push("/account/signin");
  };

  const updateProfile = async () => {
    if (!profile) return;
    try {
      setCurrentUser(await client.updateUser(profile));
    } catch {
      setError("Unable to update profile");
    }
  };
  if (!currentUser || !profile) return null;
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <input
        className="mb-3 block w-full max-w-sm rounded border border-neutral-300 px-3 py-2"
        id="wd-username"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <label className="block my-2">
        Password
        <input
          id="wd-password"
          type="password"
          className="block rounded border border-neutral-300 px-3 py-2"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
      </label>
      <label className="block my-2">
        First name
        <input
          id="wd-firstName"
          type="text"
          className="block rounded border border-neutral-300 px-3 py-2"
          value={profile.firstName}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
      </label>
      <label className="block my-2">
        Last name
        <input
          id="wd-lastName"
          type="text"
          className="block rounded border border-neutral-300 px-3 py-2"
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
      </label>
      <label className="block my-2">
        Email
        <input
          id="wd-email"
          type="email"
          className="block rounded border border-neutral-300 px-3 py-2"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </label>
      <label className="block my-2">
        Role
        <select
          id="wd-role"
          className="block rounded border p-2"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">Teaching assistant</option>
        </select>
      </label>
      <button
        type="button"
        id="wd-update-profile"
        className="me-2 rounded bg-blue-600 px-3 py-2 text-white"
        onClick={updateProfile}
      >
        Update
      </button>
      <button
        className="rounded bg-blue-600 px-3 py-2 text-white"
        type="button"
        onClick={signout}
        id="wd-signout-btn"
      >
        Sign out
      </button>
    </div>
  );
}
