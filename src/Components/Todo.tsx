import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: rgb(31, 101, 90);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 50%;
  height: 80%;
  padding: 20px 10px;
  box-shadow: 1.5px 1px 5px 0.5px rgb(186, 186, 193) inset;
  border-radius: 5px;
`;
const StyledInput = styled.input`
  font-size: 1em;
  text-align: center;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  padding: 5px;
`;
const StyledCheckButton = styled.button`
  margin-left: 30px;
  width: 80px;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 3px 0.5px rgb(77, 77, 78);
  cursor: pointer;
`;
const SemiTitle = styled.h2`
  font-size: 1.2em;
  text-align: center;
  color: rgb(0, 0, 0);
  margin-top: 20px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;
const StyledButton = styled.button`
  margin-top: 20px;
  width: 35%;
  height: 30px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: semi-bold;
  background-color: rgb(79, 122, 116);
`;

const TodoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
  background-color: rgb(115, 119, 119);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0.5px rgb(186, 186, 193);
`;

const TodoActionsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TodoTaskDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TodoText = styled.p<{ completed?: boolean }>`
  margin-left: 10px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const CompletedButton = styled.button<{ completed?: boolean }>`
  height: 20px;
  width: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) =>
    props.completed ? "rgb(214, 89, 11)" : "rgb(255, 255, 255)"};
  border-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 5px 0.5px rgb(77, 77, 78);
`;

interface ITodo {
  id: string;
  task: string;
  isCompleted?: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [task, setTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
  };

  const handleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Wrapper>
      <Title>To do List</Title>
      <SemiTitle>Enter Task</SemiTitle>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <StyledInput
            type="text"
            placeholder="Add task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </InputDiv>
        <StyledButton type="submit">Add</StyledButton>
      </Form>
      <div>
        {todos.map((todo) => (
          <TodoDiv key={todo.id}>
            <TodoTaskDiv>
              <CompletedButton
                completed={todo.isCompleted}
                onClick={() => handleComplete(todo.id)}
              />
              <TodoText completed={todo.isCompleted}>{todo.task}</TodoText>
            </TodoTaskDiv>
            <TodoActionsDiv>
              <StyledCheckButton>Edit</StyledCheckButton>
              <StyledCheckButton>Delete</StyledCheckButton>
            </TodoActionsDiv>
          </TodoDiv>
        ))}
      </div>
    </Wrapper>
  );
};

export default Todo;
