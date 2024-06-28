import Section from '../components/common/Section.jsx';
import styled from 'styled-components';
import useAccountStore from '../zustand/store/accountStore.js';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from '../api/account/account.js';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const navigate = useNavigate();
  const { account } = useAccountStore(state => state);
  const [nickname, setNickname] = useState(account?.nickname);
  const client = useQueryClient();

  useEffect(() => {
    setNickname(account.nickname);
  }, [account?.nickname]);

  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      client.invalidateQueries(['account']);
    },
  });

  const updateProfile = () => {
    mutate(nickname);
    alert('저장되었습니다.');
  };

  return (
    <Section>
      <Wrapper>
        <InputContainer>
          <label htmlFor="nickname"> 닉네임</label>
          <Nickname
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />
        </InputContainer>
        <ButtonContainer>
          <SaveButton onClick={updateProfile}>저장</SaveButton>
          <CancelButton onClick={() => navigate('/')}>취소</CancelButton>
        </ButtonContainer>
      </Wrapper>
    </Section>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;


const Nickname = styled.input`
    /* 닉네임 */
    width: 300px;
    height: 40px;
    box-sizing: border-box;

    border: 2px solid #e0e0e0;
    border-radius: 10px;
`;

const CommonButton = styled.button`
    width: 200px;
    height: 40px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: 250ms;
`;
const SaveButton = styled(CommonButton)`
    /* 저장 버튼 */

    &:hover {
        background-color: #ff6078;
        color: white;
    }

    background-color: #ffd4db;
    box-sizing: border-box;
`;

const CancelButton = styled(CommonButton)`
    /* 취소 버튼*/

    &:hover {
        background-color: #5b5b5b;
        color: white;
    }

    background-color: #e0e0e0;
    box-sizing: border-box;
`;
const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 40px;
`;

export default MyProfile;