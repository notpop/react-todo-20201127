import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") {
      return;
    }

    const new_todos = [...incompleteTodos, todoText];
    setIncompleteTodos(new_todos);
    setTodoText("");
  };

  const onClickIncompleteDelete = (index) => {
    const new_incomplete_todos = [...incompleteTodos];
    new_incomplete_todos.splice(index, 1);
    setIncompleteTodos(new_incomplete_todos);
  };

  const onClickCompleteDelete = (index) => {
    const new_complete_todos = [...completeTodos];
    new_complete_todos.splice(index, 1);
    setCompleteTodos(new_complete_todos);
  };

  const onClickComplete = (index) => {
    //　この時点でstateの更新がされないからこのonClickIncompleteDeleteを先に処理しても意図した動きになる
    // ちなみにこの関数を出た時にはstateが更新される
    // 正直記述としての気持ち悪さはあるのでsetCompleteTodosの後に記載した方が妥当かな？
    const new_complete_todos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(new_complete_todos);
    onClickIncompleteDelete(index);
  };

  const onClickBack = (index) => {
    const new_incomplete_todos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(new_incomplete_todos);
    onClickCompleteDelete(index);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
        disabled={incompleteTodos.length >= 8}
      />
      {incompleteTodos.length >= 8 && (
        <p style={{ color: "red", marginLeft: "15px" }}>
          未完了リストに登録できるTODOは８個まで。
        </p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickIncompleteDelete={onClickIncompleteDelete}
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickBack={onClickBack}
        onClickCompleteDelete={onClickCompleteDelete}
        disabled={incompleteTodos.length >= 8}
      />
    </>
  );
};
