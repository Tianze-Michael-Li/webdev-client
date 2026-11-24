"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAccountContext } from "../../account/AccountContext";
import * as client from "../client";
import { redirect, useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useCoursesStore } from "../../store/coursesStore";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const courses = useCoursesStore((state) => state.courses);
  const course = courses.find((c) => c._id === courseId);
  const [showCourseNav, setShowCourseNav] = useState(true);

  const { currentUser } = useAccountContext();
  const setCourses = useCoursesStore((state) => state.setCourses);
  const [loaded, setLoaded] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const load = async () => {
      try {
        const allCourses = await client.fetchAllCourses();
        setCourses(allCourses);
        if (currentUser) {
          const enrolled = await client.findMyCourses();
          setAllowed(enrolled.some((c: { _id: string }) => c._id === courseId));
        } else setAllowed(true);
        setLoaded(true);
      } catch {
        setError("Unable to load course");
      }
    };
    load();
  }, [courseId, currentUser, setCourses]);
  if (error) return <p role="alert">{error}</p>;
  if (!loaded) return null;
  if (!allowed) redirect("/dashboard");
  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <FaAlignJustify
          className="me-4 mb-1 inline cursor-pointer text-xl"
          onClick={() => setShowCourseNav(!showCourseNav)}
          title="Toggle course navigation"
        />
        <Breadcrumb course={course} />
      </h2>
      <hr className="my-3" />
      <div className="flex gap-4">
        {showCourseNav ? (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
