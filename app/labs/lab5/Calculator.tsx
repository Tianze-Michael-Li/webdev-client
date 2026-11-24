"use client";
import { useState } from "react";
export default function CalculatorNextWebApiClient() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const calculate = async (op = operation) => {
    setError("");
    try {
      const response = await fetch(
        `/api/lab5/calculator?${new URLSearchParams({ a, b, operation: op })}`,
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setResult("");
        return;
      }
      const symbols: Record<string, string> = {
        add: "+",
        subtract: "-",
        multiply: "×",
        divide: "÷",
      };
      setResult(`${data.a} ${symbols[op]} ${data.b} = ${data.result}`);
    } catch {
      setError("Unable to calculate");
    }
  };
  return (
    <div id="wd-calculator-next-web-api">
      <h3>Calculator (Next.js Web API)</h3>
      <label className="mb-2 block">
        A:{" "}
        <input
          className="rounded border px-3 py-1.5"
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
      </label>
      <label className="mb-2 block">
        B:{" "}
        <input
          className="rounded border px-3 py-1.5"
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </label>
      <label>
        Operation:{" "}
        <select
          className="me-2 rounded border px-3 py-1.5"
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);
            calculate(e.target.value);
          }}
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
      </label>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-white"
        onClick={() => calculate()}
      >
        Calculate
      </button>
      <input
        aria-label="Calculation result"
        className="my-2 block rounded border px-3 py-1.5"
        value={result}
        readOnly
      />
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
