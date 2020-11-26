import React, { useState } from "react";
import "./styles.css";

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
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickIncompleteDelete(index)}>
                  削除
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
                <button onClick={() => onClickCompleteDelete(index)}>
                  削除
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
