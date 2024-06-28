import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteExpenditure,
  getExpenditure,
  updateExpenditure,
} from '../api/expenditure/expenditure.js';
import useAccountStore from '../zustand/store/accountStore.js';

function Detail() {
  const regex = useMemo(() => RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/), []);
  const navigate = useNavigate();
  const expenditureId = useParams().id;

  const [date, setDate] = useState('');
  const [accountId, setAccountId] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const { account } = useAccountStore(state => state);

  const queryClient = useQueryClient();

  const {
    data: expenditure,
  } = useQuery({
    queryKey: ['expenditure'],
    queryFn: () => getExpenditure(expenditureId),
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateExpenditure,
    onSuccess: () => {
      alert('수정되었습니다.');
      queryClient.invalidateQueries(['expenditure']);
      navigate('/');
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteExpenditure,
    onSuccess: () => {
      alert('삭제되었습니다.');
      queryClient.invalidateQueries(['expenditure']);
      navigate('/');
    },
  });

  const updateExpenditureHandler = () => {
    const updatedExpenditure = {
      date,
      price,
      category,
      description,
    };

    if (!regex.test(updatedExpenditure.date)) {
      alert('날짜는 yyyy-mm-dd 형식으로 해주세요.');
      return;
    } else if (!updatedExpenditure.category) {
      alert('항목을 입력해주세요.');
      return;
    } else if (!updatedExpenditure.price) {
      alert('금액을 입력해주세요.');
      return;
    } else if (!updatedExpenditure.description) {
      alert('내용을 입력해주세요.');
      return;
    }
    updateMutate({ expenditureId, updatedExpenditure });
  };

  const deleteExpenditureHandler = () => {
    deleteMutate(expenditureId);
  };

  useEffect(() => {
    setDate(expenditure?.date);
    setPrice(expenditure?.price);
    setCategory(expenditure?.category);
    setDescription(expenditure?.description);
    setAccountId(expenditure?.accountId);
  }, [expenditure?.id]);

  return (
    <Section>
      <InputWrap>
        <Label htmlFor="date">날짜</Label>
        <Input type="text" id="date" value={date}
               onChange={(e) => setDate(e.target.value)} />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="category">항목</Label>
        <Input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="price">금액</Label>
        <Input type="number" id="price" value={price}
               onChange={(e) => setPrice(+e.target.value)} />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="description">내용</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputWrap>
      <ButtonWrap>
        {
          account?.id === accountId ?
            <>
              <Button $color={'blue'} onClick={updateExpenditureHandler}>
                수정
              </Button>
              <Button $color={'red'} onClick={deleteExpenditureHandler}>
                삭제
              </Button>
            </>
            : ''
        }
        <Button $color={'gray'} onClick={() => navigate('/')}>
          뒤로 가기
        </Button>
      </ButtonWrap>
    </Section>
  );
}

const Section = styled.section`
    max-width: 800px;
    margin: 0px auto;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
`;

const InputWrap = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const ButtonWrap = styled.section`
    display: flex;
    gap: 10px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    text-align: left;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 14px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.$color};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out 0s;
`;

export default Detail;
