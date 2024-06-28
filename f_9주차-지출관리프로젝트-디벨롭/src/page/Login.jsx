import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/account/account.js';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext.jsx';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      login(data.accessToken);
      navigate('/');
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutate({
      id,
      password,
    });
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleLogin}>
        <InputWrapper>
          <InputBox>
            <InputLabel htmlFor="id">
              아이디
              <Input required type="text" id="id" name="id" value={id}
                     onChange={(e) => setId(e.target.value)} />
            </InputLabel>
          </InputBox>
          <InputBox id="pw_line">
            <InputLabel htmlFor="pw">
              비밀번호
              <Input required type="password" id="pw" name="pw"
                     placeholder="비밀번호"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} />
            </InputLabel>
          </InputBox>
        </InputWrapper>
        <ButtonWrapper>
          <Button type={'submit'}>
            로그인
          </Button>
          <Link to="/register">회원가입 &rarr;</Link>
        </ButtonWrapper>
      </Form>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
    width: 500px;
    height: auto;
    margin: 200px auto;
    background-color: white;
    padding: 20px 24px;
    border-radius: 10px;
`;

const InputBox = styled.div`
    width: 100%;
    padding: 14px 17px 13px;
`;

const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Input = styled.input`
    height: 55px;
    width: 450px;
    box-sizing: border-box;
    gap: 10px;
    padding: 0px 10px;
    border-radius: 10px;
    font-size: 20px;
`;

const InputWrapper = styled.div`
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    margin-top: 10px;
    height: 50px;
    width: 300px;
    cursor: pointer;
    color: white;
    background-color: rgb(255, 96, 119);
    border: none;

    &:hover {
        background: #ff3553;
    }
`;

export default Login;