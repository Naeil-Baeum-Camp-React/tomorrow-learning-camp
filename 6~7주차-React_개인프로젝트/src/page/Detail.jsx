import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function Detail({ updateExpenditure, deleteExpenditure, expenditureRef }) {
  const { dateRef, categoryRef, priceRef, descriptionRef } = expenditureRef.current;
  const localStorageExpenditureList = localStorage.getItem('expenditureList');
  const expenditureId = useParams().id;
  const navigate = useNavigate();

  if (!expenditureId || !localStorageExpenditureList) {
    alert('잘못된 접근입니다.');
    navigate('/');
  }

  const expenditureList = JSON.parse(localStorageExpenditureList);
  const expenditure = expenditureList.find((expenditure) => expenditureId === expenditure.id);

  const [date, setDate] = useState(expenditure.date);
  const [price, setPrice] = useState(expenditure.price);
  const [category, setCategory] = useState(expenditure.category);
  const [description, setDescription] = useState(expenditure.description);

  const updateExpenditureHandler = () => {
    const isComplete = updateExpenditure({
      date,
      price,
      category,
      description,
      id: expenditureId,
    });

    if (isComplete) {
      alert('수정되었습니다.');
      navigate('/');
    }
  };

  function deleteExpenditureHandler() {
    deleteExpenditure(expenditureId);
    alert('삭제되었습니다');
    window.location.replace('/');
  }

  return (
    <Section>
      <InputWrap>
        <Label htmlFor="date">날짜</Label>
        <Input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} ref={dateRef} />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="category">항목</Label>
        <Input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          ref={categoryRef}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="price">금액</Label>
        <Input type="number" id="price" value={price} onChange={(e) => setPrice(+e.target.value)} ref={priceRef} />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="description">내용</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ref={descriptionRef}
        />
      </InputWrap>
      <ButtonWrap>
        <Button $color={'blue'} onClick={updateExpenditureHandler}>
          수정
        </Button>
        <Button $color={'red'} onClick={deleteExpenditureHandler}>
          삭제
        </Button>
        <Button $color={'gray'} onClick={() =>     navigate('/')}>
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
