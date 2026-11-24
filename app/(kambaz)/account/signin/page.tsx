"use client";

import axios from "axios";
import * as client from "../client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  const [error, setError] = useState("");
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      setCurrentUser(user);
      router.push("/dashboard");
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Unable to sign in")
          : "Unable to sign in",
      );
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      <input
        className="mb-3 block w-full max-w-sm rounded border border-neutral-300 px-3 py-2"
        placeholder="username"
        id="wd-username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="mb-3 block w-full max-w-sm rounded border border-neutral-300 px-3 py-2"
        placeholder="password"
        type="password"
        id="wd-password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        className="rounded bg-blue-600 px-3 py-2 text-white"
        type="button"
        onClick={signin}
        id="wd-signin-btn"
      >
        Sign in
      </button>
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
