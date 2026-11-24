"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
};
export default function WorkingWithRemoteArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const showError = (error: unknown) => {
    setErrorMessage(
      axios.isAxiosError(error)
        ? (error.response?.data?.message ?? error.message)
        : "Unable to update todos",
    );
  };
  useEffect(() => {
    client.fetchTodos().then(setTodos).catch(showError);
  }, []);
  const removeTodo = async (todo: Todo) => {
    try {
      setTodos(await client.removeTodo(todo));
    } catch (error) {
      showError(error);
    }
  };
  const createNewTodo = async () => {
    try {
      setTodos(await client.createNewTodo());
    } catch (error) {
      showError(error);
    }
  };
  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      showError(error);
    }
  };
  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      showError(error);
    }
  };
  const editTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t)),
    );
  };
  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div id="wd-working-with-remote-arrays-async">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <p
          id="wd-todo-error-message"
          className="rounded bg-red-100 px-3 py-2 text-red-800"
        >
          {errorMessage}
        </p>
      )}
      <h4 className="flex items-center gap-2">
        Todos
        <FaPlusCircle
          title="Create Todo with GET"
          onClick={createNewTodo}
          id="wd-create-todo"
          className="cursor-pointer text-green-600"
        />
        <FaPlusCircle
          title="Post Todo"
          onClick={postNewTodo}
          id="wd-post-todo"
          className="cursor-pointer text-blue-600"
        />
      </h4>
      <ul className="m-0 max-w-2xl list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border border-neutral-300 p-2"
          >
            <input
              aria-label={`Complete ${todo.title}`}
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {todo.editing ? (
              <input
                aria-label="Edit todo title"
                className="flex-1 rounded border px-2 py-1"
                value={todo.title}
                onChange={(e) =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t,
                    ),
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    updateTodo({ ...todo, editing: false });
                }}
              />
            ) : (
              <span
                className={`flex-1 ${todo.completed ? "line-through" : ""}`}
              >
                {todo.title}
              </span>
            )}
            <FaPencilAlt
              title="Edit todo"
              onClick={() => editTodo(todo)}
              className="cursor-pointer text-blue-600"
            />
            <FaTrash
              title="Remove Todo with GET"
              onClick={() => removeTodo(todo)}
              id="wd-remove-todo"
              className="cursor-pointer text-red-600"
            />
            <TiDelete
              title="Delete Todo with DELETE"
              onClick={() => deleteTodo(todo)}
              id="wd-delete-todo"
              className="cursor-pointer text-2xl text-red-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
