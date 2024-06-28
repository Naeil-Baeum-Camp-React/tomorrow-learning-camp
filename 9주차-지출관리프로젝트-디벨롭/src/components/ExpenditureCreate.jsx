import Section from './common/Section.jsx';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpenditure } from '../api/expenditure/expenditure.js';
import useAccountStore from '../zustand/store/accountStore.js';

function ExpenditureCreate() {
  const regex = useMemo(() => RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/), []);

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const { account } = useAccountStore(state => state);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createExpenditure,
    onSuccess: () => queryClient.invalidateQueries(['expenditures']),
  });

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() < 10 ? '0' + now.getMonth().toString() : now.getMonth();
    const nowStr = `${now.getFullYear()}-${month}-${now.getDate()}`;
    setDate(nowStr);
    localStorage.setItem('date', nowStr);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newExpenditure = {
      date,
      category,
      price,
      description,
      accountNickname: account.nickname,
      accountId: account.id,
    };

    if (!regex.test(newExpenditure.date)) {
      alert('날짜는 yyyy-mm-dd 형식으로 해주세요.');
      return;
    } else if (!newExpenditure.category) {
      alert('항목을 입력해주세요.');
      return;
    } else if (!newExpenditure.price) {
      alert('금액을 입력해주세요.');
      return;

    } else if (!newExpenditure.description) {
      alert('내용을 입력해주세요.');
      return;
    }

    mutate(newExpenditure);
    // dispatch(createExpenditure(newExpenditure));
    setDate(localStorage.getItem('date'));
    setCategory('');
    setPrice(0);
    setDescription('');
  };

  return (
    <Section>
      <FormCreateWrap onSubmit={onSubmitHandler}>
        <CreateContainer>
          <Label htmlFor="date">날짜</Label>
          <Input id="date" name="date" value={date}
                 onChange={(e) => setDate(e.target.value)} />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="category">항목</Label>
          <Input
            id="category"
            name="category"
            type={'text'}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="price">금액</Label>
          <Input id="price" name="price" value={price}
                 onChange={(e) => setPrice(+e.target.value)} />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="description">내용</Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CreateContainer>
        <SubmitButton type={'submit'}>저장</SubmitButton>
      </FormCreateWrap>
    </Section>
  );
}

const FormCreateWrap = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-end;
`;

const CreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 120px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    text-align: left;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    padding: 8px 20px;
    height: 34px;
    margin-top: 10px;
    background-color: rgb(0, 123, 255);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out 0s;

    &:hover {
        background-color: rgb(0, 86, 179);
    }
`;

export default React.memo(ExpenditureCreate);
