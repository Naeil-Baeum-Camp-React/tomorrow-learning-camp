import DefaultButton from './common/DefaultButton.jsx';
import { useState } from 'react';

function TodoCreateContainer({ createTodoFunction }) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const buttonProps = {
    buttonColor: '#14A0A0',
    width: '170px',
    height: '40px',
    backgroundColor: '#14A0A0',
    type: 'submit',
  };

  const onClickFunction = (e) => {
    e.preventDefault();
    if (title === '' || contents === '') {
      alert('제목이나 내용을 전부 입력해주세요.');
      return;
    }

    createTodoFunction(title, contents);
    setContents('');
    setTitle('');
  };

  return (
    <form style={todoCreateContainer} onSubmit={onClickFunction}>
      <div style={todoInputWrap}>
        제목 :
        <input style={todoInput} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={todoInputWrap}>
        내용 :
        <input style={todoInput} value={contents} onChange={(e) => setContents(e.target.value)} />
      </div>
      <div style={todoCreateButtonWrap}>
        <DefaultButton buttonProps={buttonProps}>추가하기</DefaultButton>
      </div>
    </form>
  );
}

const todoCreateContainer = {
  backgroundColor: '#c8c8c8',
  height: '17%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderRadius: '20px',
  flexWrap: 'wrap',
};

const todoCreateButtonWrap = {
  margin: 'auto 40px auto auto',
};

const todoInputWrap = {
  marginLeft: '20px',
};

const todoInput = {
  width: '300px',
  height: '30px',
  borderRadius: '10px',
  border: 'none',
  marginLeft: '10px',
};

export default TodoCreateContainer;
