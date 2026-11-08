"use client";
import { create } from "zustand";
import assignmentsJson from "../database/assignments.json";
export type Assignment = (typeof assignmentsJson)[number] & { until: string };
export const emptyAssignment: Assignment = {
  _id: "",
  course: "",
  title: "New Assignment",
  description: "",
  points: 100,
  due: "",
  available: "",
  until: "",
};
type AssignmentsStore = {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string, course: string) => void;
};
export const useAssignmentsStore = create<AssignmentsStore>((set) => ({
  assignments: assignmentsJson.map((assignment) => ({
    ...assignment,
    until: assignment.due,
  })),
  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [
        ...state.assignments,
        { ...assignment, _id: crypto.randomUUID() },
      ],
    })),
  updateAssignment: (assignment) =>
    set((state) => ({
      assignments: state.assignments.map((a) =>
        a._id === assignment._id && a.course === assignment.course
          ? assignment
          : a,
      ),
    })),
  deleteAssignment: (id, course) =>
    set((state) => ({
      assignments: state.assignments.filter(
        (a) => !(a._id === id && a.course === course),
      ),
    })),
}));
