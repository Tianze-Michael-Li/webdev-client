"use client";
import { useState } from "react";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div id="wd-QueryParameters">
      <h3>Query Parameters</h3>
      <input
        aria-label="First query parameter"
        className="mb-2 me-2 rounded border px-3 py-1.5"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        aria-label="Second query parameter"
        className="mb-2 rounded border px-3 py-1.5"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <a
          id="wd-query-parameter-add"
          className="rounded bg-blue-600 px-3 py-1.5 text-white"
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        >
          Add {a} + {b}
        </a>
        <a
          id="wd-query-parameter-subtract"
          className="rounded bg-blue-600 px-3 py-1.5 text-white"
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        >
          Subtract {a} - {b}
        </a>
        <a
          id="wd-query-parameter-multiply"
          className="rounded bg-blue-600 px-3 py-1.5 text-white"
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        >
          Multiply {a} × {b}
        </a>
        <a
          id="wd-query-parameter-divide"
          className="rounded bg-blue-600 px-3 py-1.5 text-white"
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        >
          Divide {a} ÷ {b}
        </a>
      </div>
    </div>
  );
}
