"use client";
import { useParams } from "next/navigation";
export default function ThreeNumberCalculator() {
  const { a, b, c } = useParams<{ a: string; b: string; c: string }>();
  return (
    <div id="wd-path-params-three">
      <h2>Path Parameters</h2>
      <p>
        {a} + {b} + {c} = {parseFloat(a) + parseFloat(b) + parseFloat(c)}
      </p>
    </div>
  );
}
