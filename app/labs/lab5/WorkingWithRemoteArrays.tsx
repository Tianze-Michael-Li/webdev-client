"use client";
import { useState } from "react";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;
export default function WorkingWithRemoteArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task 1",
    completed: false,
    description: "Todo description",
  });
  return (
    <div id="wd-working-with-remote-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>{" "}
      <input
        id="wd-todo-id"
        className="rounded border px-3 py-1.5"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <h4>Filtering Array Items</h4>
      <a id="wd-retrieve-completed-todos" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" href={`${API}/create`}>
        Create Todo
      </a>
      <h4>Removing from an Array</h4>
      <a id="wd-remove-todo" href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id}
      </a>
      <h4>Updating an Item in an Array</h4>
      <a
        id="wd-update-todo-title"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
      >
        Update Todo
      </a>{" "}
      <input
        aria-label="Todo ID to update"
        className="rounded border px-3 py-1.5"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />{" "}
      <input
        id="wd-todo-title"
        className="rounded border px-3 py-1.5"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <div className="my-2">
        <a
          id="wd-update-todo-completed"
          href={`${API}/${todo.id}/completed/${todo.completed}`}
        >
          Complete Todo ID = {todo.id}
        </a>{" "}
        <input
          id="wd-todo-completed"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
      </div>
      <a
        id="wd-update-todo-description"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
      >
        Describe Todo ID = {todo.id}
      </a>{" "}
      <input
        id="wd-todo-description"
        className="rounded border px-3 py-1.5"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
    </div>
  );
}
