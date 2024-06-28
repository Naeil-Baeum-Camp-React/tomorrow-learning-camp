import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpenditure, updateExpenditure } from '../redux/slices/expenditureSlice.js';

function Detail() {
  const regex = useMemo(() => RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/), []);

  const priceRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const dispatch = useDispatch();

  const expenditureList = useSelector((state) => state.expenditure.expenditureList);
  const navigate = useNavigate();
  const expenditureId = useParams().id;

  if (!expenditureId || expenditureList.length === 0) {
    alert('잘못된 접근입니다.');
    navigate('/');
  }

  const expenditure = expenditureList.find((expenditure) => expenditureId === expenditure.id);
  const [date, setDate] = useState(expenditure.date);
  const [price, setPrice] = useState(expenditure.price);
  const [category, setCategory] = useState(expenditure.category);
  const [description, setDescription] = useState(expenditure.description);

  const updateExpenditureHandler = () => {
    const updatedExpenditure = {
      date,
      price,
      category,
      description,
      id: expenditureId,
    };

    if (!regex.test(updatedExpenditure.date)) {
      alert('날짜는 yyyy-mm-dd 형식으로 해주세요.');
      dateRef.current.focus();
      return;
    } else if (!updatedExpenditure.category) {
      categoryRef.current.focus();
      alert('항목을 입력해주세요.');
      return;
    } else if (!updatedExpenditure.price) {
      alert('금액을 입력해주세요.');
      priceRef.current.focus();
      return;
    } else if (!updatedExpenditure.description) {
      descriptionRef.current.focus();
      alert('내용을 입력해주세요.');
      return;
    }

    dispatch(updateExpenditure(updatedExpenditure));
    alert('수정되었습니다.');
    navigate('/');
  };

  function deleteExpenditureHandler() {
    dispatch(deleteExpenditure(expenditureId));
    alert('삭제되었습니다');
    navigate('/');
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
