import Section from './common/Section.jsx';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

function ExpenditureCreate({ createExpenditure, expenditureRef }) {
  const { dateRef, categoryRef, priceRef, descriptionRef } = expenditureRef.current;
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() < 10 ? '0' + now.getMonth().toString() : now.getMonth();
    setDate(`${now.getFullYear()}-${month}-${now.getDate()}`);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const isComplete = createExpenditure({
      id: uuid4(),
      date,
      category,
      price,
      description,
    });

    if (isComplete) {
      setCategory('');
      setPrice(0);
      setDescription('');
    }
  };

  return (
    <Section>
      <FormCreateWrap onSubmit={onSubmitHandler}>
        <CreateContainer>
          <Label htmlFor="date">날짜</Label>
          <Input id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} ref={dateRef} />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="category">항목</Label>
          <Input
            id="category"
            name="category"
            type={'text'}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ref={categoryRef}
          />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="price">금액</Label>
          <Input id="price" name="price" value={price} onChange={(e) => setPrice(+e.target.value)} ref={priceRef} />
        </CreateContainer>
        <CreateContainer>
          <Label htmlFor="description">내용</Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={descriptionRef}
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
// 부모가 리렌더링되어도 props가 바뀌지 않으면 리렌더링이 되지 않도록 memo 사용
export default React.memo(ExpenditureCreate);
