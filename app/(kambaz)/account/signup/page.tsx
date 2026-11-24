"use client";

import axios from "axios";
import * as client from "../client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  const [error, setError] = useState("");
  const signup = async () => {
    if (!username || !password) return;
    try {
      const current = await client.signup({ username, password });
      setCurrentUser(current);
      router.push("/account/profile");
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Unable to sign up")
          : "Unable to sign up",
      );
    }
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <input
        className="mb-3 block w-full max-w-sm rounded border border-neutral-300 px-3 py-2"
        id="wd-username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-3 block w-full max-w-sm rounded border border-neutral-300 px-3 py-2"
        id="wd-password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="rounded bg-blue-600 px-3 py-2 text-white"
        type="button"
        onClick={signup}
        id="wd-signup-btn"
      >
        Sign up
      </button>{" "}
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
