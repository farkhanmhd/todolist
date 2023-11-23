import { useState, useEffect } from "react";
import AddNoteForm from "./components/AddNoteForm";

export default function App() {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const storedToDoList = JSON.parse(localStorage.getItem("todoList"));
    if (storedToDoList) setToDoList(storedToDoList);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newToDo = {
      id: Date.now(),
      text: event.target[0].value,
      done: false,
    };
    event.target[0].value = "";
    setToDoList([...toDoList, newToDo]);
    localStorage.setItem("todoList", JSON.stringify([...toDoList, newToDo]));
  };

  const handleChecked = (id) => {
    const newToDoList = toDoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setToDoList(newToDoList);
    localStorage.setItem("todoList", JSON.stringify(newToDoList));
  };

  const deleteHandler = (id) => {
    document.getElementById(id).classList.add("fade-out");
    setTimeout(() => {
      const newToDoList = toDoList.filter((todo) => todo.id !== id);
      setToDoList(newToDoList);
      localStorage.setItem("todoList", JSON.stringify(newToDoList));
    }, 450);
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-slate-800 overflow-hidden pb-5 ">
      <div
        className={`app overflow-hidden w-5/6 h-full flex flex-col ${
          toDoList.length ? "justify-start" : "justify-center"
        } items-center gap-y-3 sm:gap-y-10 md:gap-y-7`}
        style={{
          minWidth: "300px",
          maxWidth: "800px",
        }}
      >
        <h1
          className={`text-3xl font-serif font-light text-center text-slate-200 ${
            toDoList.length > 0 ? "mt-7 md:mt-32" : ""
          } md:text-5xl`}
        >
          To Do List App
        </h1>
        <p className="text-white text-center text-xs">
          {" "}
          by{" "}
          <a
            href="https://instagram.com/farkhanmhd"
            className="text-blue-200"
            target="_blank"
          >
            farkhanmhd
          </a>
        </p>
        <AddNoteForm onSubmit={handleSubmit} />
        {toDoList.length > 0 && (
          <div className="todos-box w-full h-full">
            <h2 className="text-slate-200 text-center font-bold text-2xl my-2.5 sm:my-5">
              To do Lists
            </h2>
            <div className="todos-container w-full sm:h-[30vh] md:h-[50vh] lg:h-[35vh] overflow-auto">
              <ul className="text-slate-200 flex flex-col items-center w-full h-full">
                {toDoList.map((todo) => (
                  <li
                    key={todo.id}
                    id={todo.id}
                    className="fade-in border-b border-white border-solid w-5/6 py-5 last-of-type:border-none relative"
                  >
                    <input
                      id={todo.id}
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                      checked={todo.done}
                      onChange={() => handleChecked(todo.id)}
                    ></input>
                    <label
                      htmlFor={todo.id}
                      className={
                        "cursor-pointer line-clamp-1 text-ellipsis absolute top-1/2 -translate-y-1/2 left-10 right-16 " +
                        `${todo.done ? " line-through" : ""}`
                      }
                    >
                      {todo.text}
                    </label>
                    <button
                      type="button"
                      className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute right-0"
                      onClick={() => deleteHandler(todo.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        style={{ filter: "invert(1)" }}
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
