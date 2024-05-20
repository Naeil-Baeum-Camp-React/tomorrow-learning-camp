import DefaultButton from './common/DefaultButton.jsx';

function TodoBox({ todo, doneTodoFunction, deleteTodoFunction }) {
  const buttonProps = (buttonColor, onClickFunction) => {
    return {
      buttonColor,
      width: '120px',
      height: '30px',
      backgroundColor: 'white',
      onClickFunction: () => onClickFunction(todo.id),
    };
  };

  return (
    <div key={todo.id} style={todoBoxStyle}>
      <div style={title}>{todo.title}</div>
      <div style={contents}>{todo.contents}</div>
      <div style={buttonContainer}>
        <DefaultButton buttonProps={buttonProps('red', deleteTodoFunction)}>삭제하기</DefaultButton>
        <DefaultButton buttonProps={buttonProps('green', doneTodoFunction)}>
          {todo.isDone ? '취소' : '완료'}
        </DefaultButton>
      </div>
    </div>
  );
}

const todoBoxStyle = {
  width: '300px',
  height: '150px',
  border: '3px solid #14A0A0',
  display: 'flex',
  marginLeft: '20px',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: '10px',
  marginBottom: '10px',
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  height: '40px',
};

const title = {
  fontWeight: 'bold',
  marginLeft: '20px',
};

const contents = {
  marginLeft: '20px',
};

export default TodoBox;
