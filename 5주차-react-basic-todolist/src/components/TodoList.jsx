import TodoBox from './TodoBox.jsx';

function TodoList({ todoListProps }) {
  const { isDone, todoList, deleteTodoFunction, doneTodoFunction } = todoListProps;

  return (
    <div>
      <h1 style={TodoListTitle}>{isDone ? 'Done...' : 'Working...'}</h1>
      <div style={TodoListStyle}>
        {todoList
          ?.filter((todo) => todo.isDone === isDone)
          .map((todo) => {
            return (
                <TodoBox
                  key={todo.id}
                  isDone={isDone}
                  todo={todo}
                  doneTodoFunction={doneTodoFunction}
                  deleteTodoFunction={deleteTodoFunction}
                />
            );
          })}
      </div>
    </div>
  );
}

const TodoListTitle = {
  marginLeft: '20px',
};

const TodoListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

export default TodoList;
