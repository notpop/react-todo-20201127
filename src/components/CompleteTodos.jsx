import React from "react";

export const CompleteTodos = (props) => {
  const { completeTodos, onClickBack, onClickCompleteDelete } = props;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickBack(index)}>戻す</button>
              <button onClick={() => onClickCompleteDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
