import { useState, useEffect } from "react";
import AddNoteForm from "./components/AddNoteForm";

export default function App() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const [toDoList, setToDoList] = useState([]);
  const [isDark, setIsDark] = useState(localStorage.theme);

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
    document.getElementById(`item-${id}`).classList.add("fade-out");
    setTimeout(() => {
      const newToDoList = toDoList.filter((todo) => todo.id !== id);
      setToDoList(newToDoList);
      localStorage.setItem("todoList", JSON.stringify(newToDoList));
    }, 450);
  };

  const handleDarkMode = () => {
    localStorage.theme = isDark === "dark" ? "light" : "dark";
    setIsDark(localStorage.theme);
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-slate-300 dark:bg-slate-800 overflow-hidden pb-5 ">
      <nav className="fixed top-40 md:top-0 md:right-0 md:left-0 dark:text-white">
        <ul className="flex flex-col gap-y-1 md:flex-row md:justify-end md:items-center md:gap-4 md:pr-10 ">
          <li className="md:py-3 w-[30px] flex justify-center items-center">
            <a href="https://instagram.com/farkhanmhd" target="_blank">
              <svg
                width="35"
                height="35"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke={isDark === "dark" ? "white" : "black"}
                  stroke-width="8"
                  d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="30"
                  stroke={isDark === "dark" ? "white" : "black"}
                  stroke-width="8"
                />
                <circle
                  cx="135"
                  cy="57"
                  r="9"
                  fill={isDark === "dark" ? "white" : "black"}
                />
              </svg>
            </a>
          </li>
          <li className=" md:py-3 w-[30px] flex justify-center items-center">
            <a
              href="https://github.com/farkhanmhd/todolist.com"
              target="_blank"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill={isDark === "dark" ? "white" : "black"}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.54545C5.94479 1.54545 1.04348 6.42167 1.04348 12.4277C1.04348 16.8374 3.6861 20.6328 7.4903 22.3403C7.88799 22.5188 8.27744 22.4482 8.58123 22.2205C8.89257 21.9871 9.11323 21.5853 9.11323 21.1128V20.5426L7.75618 20.3588C7.74631 20.3575 7.73648 20.3559 7.72671 20.354C6.97768 20.2083 6.47304 19.9453 6.10316 19.5662C5.7917 19.247 5.60192 18.8646 5.44107 18.5405C5.42204 18.5022 5.40342 18.4647 5.38505 18.4282C5.18145 18.0236 5.03633 17.7364 4.89784 17.5171C4.76321 17.304 4.65787 17.1937 4.55411 17.1249C4.28955 16.9497 4.03631 16.6531 4.03631 16.2816C4.03631 16.0778 4.1185 15.8695 4.29663 15.722C4.46448 15.583 4.66637 15.5395 4.84185 15.5395C5.06432 15.5395 5.27305 15.6076 5.44732 15.6858C5.6254 15.7657 5.80173 15.8721 5.96683 15.9821C6.36867 16.25 6.76495 16.5675 7.10004 16.9576C7.44896 17.3638 7.69554 17.6224 8.06841 17.6753C8.37359 17.7186 8.68574 17.7199 8.92914 17.7088C8.93981 17.651 8.95288 17.5898 8.96889 17.5263C8.99766 17.4123 9.03798 17.2829 9.09513 17.149C8.81903 17.0842 8.51955 16.9997 8.21846 16.8929C7.56371 16.6607 6.83548 16.3005 6.34535 15.7526C5.80695 15.1508 5.47376 14.6145 5.28766 13.9858C5.10653 13.3739 5.07692 12.7113 5.07692 11.8945C5.07692 10.6456 5.61813 9.59213 6.02356 9.03344C5.89031 8.60808 5.7509 8.05573 5.68912 7.53172C5.65119 7.20991 5.63878 6.86932 5.68999 6.56435C5.73929 6.27079 5.86521 5.91105 6.19386 5.69335C6.51135 5.48304 6.88251 5.49165 7.17256 5.54637C7.47424 5.60328 7.78715 5.72824 8.07491 5.87064C8.5435 6.10253 9.00981 6.41322 9.35917 6.67557C9.96146 6.49867 11.0262 6.27125 11.9886 6.25009C11.9962 6.24993 12.0038 6.24993 12.0114 6.25009C12.9746 6.27127 13.9923 6.49865 14.5789 6.67472C14.9281 6.41255 15.3939 6.10228 15.862 5.87064C16.1498 5.72824 16.4627 5.60328 16.7644 5.54637C17.0544 5.49165 17.4256 5.48304 17.7431 5.69335C18.0717 5.91105 18.1976 6.27079 18.2469 6.56435C18.2981 6.86932 18.2857 7.20991 18.2478 7.53172C18.186 8.05573 18.0466 8.60808 17.9134 9.03344C18.3188 9.59213 18.86 10.6456 18.86 11.8945C18.86 12.7113 18.8304 13.3739 18.6493 13.9858C18.4632 14.6145 18.13 15.1508 17.5916 15.7526C17.1015 16.3005 16.3732 16.6607 15.7185 16.8929C15.3488 17.024 14.9816 17.1215 14.6571 17.1902C14.78 17.562 14.8237 17.863 14.8237 18.0357V21.1255C14.8237 21.5964 15.043 21.9975 15.3532 22.2314C15.656 22.4598 16.0446 22.5319 16.4424 22.3567C20.2814 20.6648 22.9565 16.8603 22.9565 12.4277C22.9565 6.42167 18.0552 1.54545 12 1.54545ZM9.47621 18.7103C9.21695 18.7474 9.47471 18.7106 9.47471 18.7106L9.47202 18.7109L9.46363 18.7121L9.43515 18.7157C9.41116 18.7187 9.37728 18.7227 9.33492 18.727C9.25033 18.7356 9.13113 18.7458 8.98854 18.7526C8.70624 18.766 8.31904 18.7667 7.92203 18.7104C7.13052 18.598 6.65046 18.0378 6.33885 17.6742C6.32876 17.6624 6.31886 17.6509 6.30913 17.6395C6.20907 17.523 6.09953 17.4125 5.98201 17.307C6.08533 17.4975 6.19176 17.709 6.3068 17.9376L6.31681 17.9575C6.33465 17.993 6.35183 18.0273 6.36849 18.0605C6.54298 18.4089 6.65892 18.6403 6.8493 18.8354C7.03478 19.0255 7.32532 19.2089 7.91124 19.3249L9.70488 19.5678C9.96366 19.6029 10.1567 19.8242 10.1567 20.0858V21.1128C10.1567 21.9133 9.78216 22.6259 9.2064 23.0575C8.62309 23.4948 7.83355 23.64 7.06368 23.2944C2.90196 21.4265 0 17.2686 0 12.4277C0 5.83613 5.37667 0.5 12 0.5C18.6233 0.5 24 5.83613 24 12.4277C24 17.2954 21.0612 21.4633 16.8625 23.3136C16.0929 23.6528 15.3063 23.5045 14.7257 23.0667C14.1525 22.6344 13.7802 21.9234 13.7802 21.1255V18.0357C13.7802 17.9657 13.7313 17.5614 13.4577 17.0177C13.3807 16.8647 13.3834 16.6837 13.4649 16.5331C13.5465 16.3826 13.6965 16.2816 13.8664 16.2628C14.2086 16.225 14.787 16.1142 15.3703 15.9074C15.9643 15.6967 16.4974 15.4094 16.8145 15.0549C17.2852 14.5287 17.5196 14.1251 17.6489 13.6885C17.7831 13.2351 17.8165 12.7071 17.8165 11.8945C17.8165 10.7538 17.2169 9.79498 16.9407 9.48618C16.8134 9.34393 16.7737 9.14346 16.8372 8.96333C16.9762 8.56877 17.147 7.95628 17.2115 7.4091C17.244 7.13351 17.2458 6.90386 17.2179 6.7378C17.1992 6.6261 17.1738 6.57992 17.1641 6.56531C17.1461 6.56043 17.087 6.54932 16.9575 6.57376C16.7872 6.60589 16.5703 6.68615 16.3241 6.80799C15.8345 7.05026 15.3246 7.40853 15.0077 7.66438C14.8659 7.77889 14.6747 7.81099 14.5034 7.74908C14.1011 7.60372 13.0026 7.31957 12 7.29555C10.9929 7.31966 9.8314 7.60534 9.43357 7.74908C9.26222 7.81099 9.07104 7.77889 8.92921 7.66438C8.6123 7.40853 8.1024 7.05026 7.61281 6.80799C7.3666 6.68615 7.14974 6.60589 6.97947 6.57376C6.84991 6.54932 6.79082 6.56043 6.77288 6.56531C6.76313 6.57992 6.73777 6.6261 6.71901 6.7378C6.69113 6.90386 6.69291 7.13351 6.7254 7.4091C6.7899 7.95628 6.96075 8.56877 7.09974 8.96333C7.16319 9.14346 7.12352 9.34393 6.99626 9.48618C6.72 9.79498 6.1204 10.7538 6.1204 11.8945C6.1204 12.7071 6.15386 13.2351 6.28807 13.6885C6.4173 14.1251 6.65172 14.5287 7.1224 15.0549C7.43953 15.4094 7.97265 15.6967 8.56664 15.9074C9.14989 16.1142 9.72837 16.225 10.0705 16.2628C10.2856 16.2865 10.4637 16.4408 10.5182 16.6505C10.5728 16.8602 10.4925 17.082 10.3165 17.2079C10.1511 17.3261 10.0423 17.5378 9.98056 17.7825C9.95142 17.898 9.93711 18.0043 9.93027 18.0813C9.92688 18.1194 9.92543 18.1492 9.92481 18.1679L9.92437 18.1869C9.92729 18.4492 9.73547 18.6733 9.47621 18.7103Z"
                />
              </svg>
            </a>
          </li>
          <li className="flex md:py-3 hover:cursor-pointer w-[30px] justify-center items-center">
            <button onClick={handleDarkMode}>
              {isDark === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  viewBox="0 -960 960 960"
                  width="35"
                  fill={isDark === "dark" ? "white" : "black"}
                >
                  <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 40q-66.846 0-113.423-46.577T320-480q0-66.846 46.577-113.423T480-640q66.846 0 113.423 46.577T640-480q0 66.846-46.577 113.423T480-320ZM200-460H60v-40h140v40Zm700 0H760v-40h140v40ZM460-760v-140h40v140h-40Zm0 700v-140h40v140h-40ZM269.846-663.846l-86.385-83.923 27.77-29.77 84.461 85.385-25.846 28.308Zm478.923 481.385-84.692-85.616 26.077-28.077 86.385 83.923-27.77 29.77Zm-84.923-507.693 83.923-86.385 29.77 27.77-85.385 84.461-28.308-25.846ZM182.461-211.231l85.616-84.692 26.538 26.077-83.153 87.154-29.001-28.539ZM480-480Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  viewBox="0 -960 960 960"
                  width="35"
                  fill={isDark === "dark" ? "white" : "black"}
                >
                  <path d="M482.308-160q-133.334 0-226.667-93.333Q162.307-346.667 162.307-480q0-121.539 79.231-210.77Q320.769-780 437.693-796.154q3.23 0 6.346.231 3.115.23 6.115.692-20.231 28.231-32.038 62.808-11.808 34.577-11.808 72.423 0 106.667 74.667 181.333Q555.641-404 662.308-404q38.077 0 72.538-11.808 34.462-11.808 61.923-32.039.462 3 .693 6.116.231 3.115.231 6.346-15.385 116.923-104.616 196.154T482.308-160Zm0-40q88 0 158-48.5t102-126.5q-20 5-40 8t-40 3q-123 0-209.5-86.5t-86.5-209.5q0-20 3-40t8-40q-78 32-126.5 102t-48.5 158q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`app mt-7 overflow-hidden w-5/6 h-full flex flex-col ${
          toDoList.length ? "justify-start" : "justify-center"
        } items-center gap-y-3 sm:gap-y-10 md:gap-y-7`}
        style={{
          minWidth: "300px",
          maxWidth: "800px",
        }}
      >
        <h1
          className={`text-3xl font-serif font-light text-center text-slate-900 dark:text-slate-100 ${
            toDoList.length > 0 ? "mt-7 md:mt-32" : ""
          } md:text-5xl`}
        >
          To Do List App
        </h1>
        <AddNoteForm onSubmit={handleSubmit} />
        {toDoList.length > 0 && (
          <div className="todos-box w-full h-full dark:text-slate-100">
            <h2 className="text-center font-bold text-2xl my-2.5 sm:my-5 ">
              To do Lists
            </h2>
            <div className="todos-container w-full h-fit sm:max-h-[30vh] md:max-h-[50vh] lg:max-h-[35vh] overflow-auto rounded-2xl">
              <ul className=" flex flex-col items-center w-full gap-y-3 py-3">
                {toDoList.map((todo) => (
                  <li
                    key={todo.id}
                    id={`item-${todo.id}`}
                    className="fade-in w-full py-5 last-of-type:border-none relative px-5 flex items-center gap-5 bg-white dark:bg-slate-950 shadow-md rounded-2xl origin-top"
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
                        "cursor-pointer line-clamp-1 text-ellipsis " +
                        `${todo.done ? " line-through" : ""}`
                      }
                    >
                      {todo.text}
                    </label>
                    <button
                      type="button"
                      className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 place-self-end absolute top-1/2 -translate-y-1/2 right-5"
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
