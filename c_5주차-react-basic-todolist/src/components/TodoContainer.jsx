import TodoList from './TodoList.jsx';
import TodoCreateContainer from './TodoCreateContainer.jsx';
import { useState } from 'react';

function TodoContainer() {
  const initTodoList = [
    {
      id: 1,
      title: '리액트공부하기',
      contents: '리액트 기초를 공부해봅시다.',
      isDone: false,
    },
    {
      id: 2,
      title: '자바공부하기',
      contents: '자바액트 기초를 공부해봅시다.',
      isDone: true,
    },
    {
      id: 3,
      title: 'JS공부하기',
      contents: 'JS 기초를 공부해봅시다.',
      isDone: false,
    },
  ];

  const [todoList, setTodoList] = useState([...initTodoList]);

  const createTodo = (title, contents) => {
    setTodoList([
      ...todoList,
      {
        title,
        contents,
        id: Date.now(),
        isDone: false,
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const doneTodo = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    );
  };

  const todoListProps = (isDone) => {
    return {
      isDone,
      todoList,
      deleteTodoFunction: deleteTodo,
      doneTodoFunction: doneTodo,
    };
  };

  return (
    <>
      <TodoCreateContainer createTodoFunction={createTodo} />
      <TodoList todoListProps={todoListProps(false)} />
      <TodoList todoListProps={todoListProps(true)} />
    </>
  );
}

export default TodoContainer;
