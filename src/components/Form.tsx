"use client";

import { useContext, useState } from "react";
import { TodoContext } from "@/utils/Context";

const INPUT_STYLE = "rounded-lg h-8 px-3";

export default function Form() {
  const [enteredTodo, setEnteredTodo] = useState({ title: "", contents: "" });
  const { setTodos } = useContext(TodoContext);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredTodo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((enteredTodo.title, enteredTodo.contents === "")) return null;
    const { title, contents } = enteredTodo;
    const todo = {
      id: `todos_${new Date().getTime() + Math.random()}`,
      isDone: false,
      title: title,
      contents: contents,
    };
    setTodos((prev) => [...prev, todo]);
    setEnteredTodo({ title: "", contents: "" });
  };

  return (
    <form className="flex items-center justify-between h-24 bg-slate-300 rounded-md px-5" onSubmit={onSubmitHandler}>
      <div className="flex items-center gap-3">
        <label className="font-bold" htmlFor="title">
          제목
        </label>
        <input
          className={INPUT_STYLE}
          id="title"
          type="text"
          name="title"
          value={enteredTodo.title}
          onChange={onChangeHandler}
          required
        />
        <label className="font-bold" htmlFor="contents">
          내용
        </label>
        <input
          className={INPUT_STYLE}
          id="contents"
          name="contents"
          value={enteredTodo.contents}
          onChange={onChangeHandler}
          required
        />
      </div>
      <button className="w-36 h-10 bg-teal-400 font-bold rounded-lg shadow-sm">추가하기</button>
    </form>
  );
}