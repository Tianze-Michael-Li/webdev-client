"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  const links = currentUser
    ? (["profile"] as const)
    : (["signin", "signup"] as const);
  const pathname = usePathname() ?? "";
  return (
    <div id="wd-account-navigation" className="list-group wd">
      {links.map((link) => (
        <span key={link} className="contents">
          <Link
            href={`/account/${link}`}
            className={`list-group-item ${pathname.includes(link) ? "active" : ""}`}
          >
            {link === "signin"
              ? "Signin"
              : link === "signup"
                ? "Signup"
                : "Profile"}
          </Link>
        </span>
      ))}
    </div>
  );
}
