import Section from './common/Section.jsx';
import styled from 'styled-components';
import React, { useMemo } from 'react';

function SelectMonth({ currentMonth, changeCurrentMonth }) {
  const monthList = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []);

  return (
    <Section>
      <MonthWrap>
        {monthList.map((month) => (
          <MonthButton key={month} $isActive={currentMonth === month} onClick={() => changeCurrentMonth(month)}>
            {month}월
          </MonthButton>
        ))}
      </MonthWrap>
    </Section>
  );
}

const MonthButton = styled.button`
    text-align: center;
    font-family: Pretendard, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    height: 60px;
    padding: 20px;
    width: 104px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: ${(props) => (props.$isActive ? '#fff' : '#000')};
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background: ${(props) => (props.$isActive ? '#2EC4B6' : '#F6F7FA')};
`;

const MonthWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export default React.memo(SelectMonth);
