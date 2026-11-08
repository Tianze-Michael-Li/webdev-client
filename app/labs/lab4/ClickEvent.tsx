"use client";

const hello = () => {
  alert("Hello World!");
};

const goodbye = () => alert("Goodbye World!");

export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        type="button"
        onClick={hello}
        id="wd-onclick-hello"
        className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Click Hello
      </button>
      <hr />
      <button
        type="button"
        id="wd-onclick-tianze"
        className="m-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={() => alert("Hello, Tianze Li!")}
      >
        Greet Tianze Li
      </button>
      <button
        type="button"
        id="wd-onclick-goodbye"
        className="m-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        onClick={() => goodbye()}
      >
        Click Goodbye
      </button>
    </div>
  );
}
