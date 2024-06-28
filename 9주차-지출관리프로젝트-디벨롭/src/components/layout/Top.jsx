import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../api/account/account.js';
import useAccountStore from '../../zustand/store/accountStore.js';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Top() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const {
    data: account,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['account'],
    queryFn: getMyInfo,
  });

  const { setAccount } = useAccountStore(state => state);

  useEffect(() => {
    setAccount(account);
  }, [account?.id, account?.nickname, account?.avatar]);

  // useAccountStore(state => state.setAccount(account));
  if (isPending || isError) {
    return <div></div>;
  }

  return (
    <TopWrapper>
      <LeftTop>
        <StNav onClick={() => navigate('/')}>
          Home
        </StNav>
        <StNav onClick={() => navigate('/profile')}>
          마이 프로필
        </StNav>
      </LeftTop>
      <RightTop>
        <Profile>
          안녕하세요
          <StNickname>{account.nickname}</StNickname>님
        </Profile>
        <StButton onClick={logout}>로그아웃</StButton>
      </RightTop>
    </TopWrapper>
  );
}

const TopWrapper = styled.div`
    width: 100%;
    height: 50px;
    background-color: black;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

const LeftTop = styled.div`
    color: white;
    margin-top: 15px;
    margin-left: 20px;

    display: flex;
    gap: 20px;
`;

const StNav = styled.div`
    cursor: pointer;
    font-size: 20px;
`;

const RightTop = styled.div`
    display: flex;
    margin-right: 30px;
    color: white;
    gap: 40px;
    font-size: 20px;
`;

const Profile = styled.div`
    display: flex;
    color: white;
    margin-top: 15px;
    gap: 10px;
`;

const StButton = styled.button`
    margin-top: 10px;
    height: 30px;
    width: 100px;
    cursor: pointer;
    color: white;
    background-color: rgb(255, 96, 119);
    border: none;
    border-radius: 10px;

    &:hover {
        background: #ff3553;
    }
`;

const StNickname = styled.p`
    font-weight: 1000;
`;

export default Top;
