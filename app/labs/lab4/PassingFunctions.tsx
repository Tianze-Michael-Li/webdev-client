export default function PassingFunctions({
  personalFunction,
  theOtherFunction,
  message,
  theFunction,
}: {
  personalFunction: () => void;
  theOtherFunction: () => void;
  message: string;
  theFunction: (message: string) => void;
}) {
  return (
    <div id="wd-passing-functions">
      <h2>Passing Functions</h2>
      <button
        type="button"
        onClick={() => theFunction(`From parent: ${message}`)}
        id="wd-pass-functions-click"
        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Invoke the Function
      </button>
      <button
        type="button"
        id="wd-pass-functions-name-click"
        className="m-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={() => personalFunction()}
      >
        Greet Tianze Li
      </button>
      <button
        type="button"
        id="wd-pass-functions-other-click"
        className="m-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={() => theOtherFunction()}
      >
        Other function
      </button>
      <hr />
    </div>
  );
}
