import React from "react";

const style = {
  backgroundColor: "#ffffe0",
  width: "400px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const CompleteTodos = (props) => {
  const { completeTodos, onClickBack, onClickCompleteDelete, disabled } = props;
  return (
    <div style={style}>
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickBack(index)} disabled={disabled}>
                戻す
              </button>
              <button onClick={() => onClickCompleteDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
