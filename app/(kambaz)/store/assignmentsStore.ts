"use client";
import { create } from "zustand";

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
  until: string;
};
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
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string, course: string) => void;
};
export const useAssignmentsStore = create<AssignmentsStore>((set) => ({
  assignments: [],
  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [...state.assignments, assignment],
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
