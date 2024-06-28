import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '../api/account/account.js';

function Register() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');

  let navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      alert('회원가입 되었습니다.');
      navigate('/login');
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (id.length < 4 || id.length > 10) {
      alert('아이디는 4자 ~ 10자로 입력해주세요.');
      return;
    } else if (password !== checkPassword) {
      alert('패스워드와 비밀번호 확인이 다릅니다.');
      return;
    } else if (password.length < 4 || password.length > 15) {
      alert('패스워드는 4자 ~ 15자로 입력해주세요.');
      return;
    } else if (nickname.length < 4 || nickname.length > 10) {
      alert('닉네임은 4자 ~ 10자로 입력해주세요.');
      return;
    }


    mutate({
      id,
      password,
      nickname,
      avatar: 'https://ookczceidorqoevzkbmi.supabase.co/storage/v1/object/public/expenditure/830FBABE-B02F-44AB-ABD6-CFE5CAD7C58D_1_105_c.jpeg',
    });
  };

  return (
    <RegisterWrapper>
      <StTitle>회원가입</StTitle>
      <StJoinForm onSubmit={handleRegister}>
        <StInputDiv>
          <label htmlFor="id">이메일
            <StInput id="id" name="id" type="text" value={id}
                     onChange={(e) => setId(e.target.value.replaceAll(' ', ''))}
                     required />
          </label>
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="nickname">닉네임
            <StInput id="nickname" name="nickname" type="text" value={nickname}
                     onChange={(e) => setNickname(e.target.value.replaceAll(' ', ''))}
                     required />
          </label>
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="password">비밀번호
            <StInput id="password" name="password" type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value.replaceAll(' ', ''))}
                     required />
          </label>
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="checkPassword">비밀번호 확인
            <StInput id="checkPassword" name="checkPassword" type="password"
                     value={checkPassword}
                     onChange={(e) => setCheckPassword(e.target.value.replaceAll(' ', ''))}
                     required />
          </label>
        </StInputDiv>
        <StJoinDiv>
          <StJoinButton type="submit">회원가입</StJoinButton>
          <Link to="/login">로그인 &rarr;</Link>
        </StJoinDiv>
      </StJoinForm>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 200px auto;
    background-color: white;
    width: 500px;
    height: auto;
    border-radius: 10px;
`;
const StJoinForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const StInputDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 20px;
`;
const StInput = styled.input`
    /* flex-grow: 1; */
    height: 55px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 20px;
`;
const StJoinDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
    margin-bottom: 20px;
`;

export const StTitle = styled.h1`
    font-size: 32px;
    line-height: 39px;
    font-weight: 600;
    color: #3a3e41;
`;

export const StJoinButton = styled.button`
    cursor: pointer;
    color: white;
    background-color: #ff6077;
    border: none;

    &:hover {
        background: #ff3553;
    }

    width: 450px;
    height: 55px;

    font-size: 20px;
    border-radius: 10px;
`;

export default Register;