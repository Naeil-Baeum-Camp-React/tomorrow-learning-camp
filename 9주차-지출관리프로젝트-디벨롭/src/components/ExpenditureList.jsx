import Section from './common/Section.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function ExpenditureList({ expenditureList }) {
  const navigate = useNavigate();

  const moveDetail = (expenditureId) => {
    navigate(`detail/${expenditureId}`);
  };

  const truncateAndAppendEllipsis = (str, limitLength) => {
    if (str.length > 30) {
      return str.substring(str, limitLength) + '...';
    }
    return str;
  };

  return (
    <Section>
      <ExpenditureListWrap>
        {
          expenditureList?.map((expenditure) => {
            return (
              <ExpenditureContainer
                key={expenditure.id}
                onClick={() => moveDetail(expenditure.id)}>
                <ExpenditureContents>
                  <span>{expenditure.date} : ({expenditure.accountNickname})</span>
                  <span>
                  {truncateAndAppendEllipsis(expenditure.category + '-' + expenditure.description, 70)}
                </span>
                </ExpenditureContents>
                <span>{expenditure.price} 원</span>
              </ExpenditureContainer>
            );
          })}
      </ExpenditureListWrap>
    </Section>
  );
}

const ExpenditureListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ExpenditureContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-radius: 8px;
    background-color: rgb(249, 249, 249);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    transition: transform 0.2s ease-in-out 0s;
    cursor: pointer;

    span:last-child {
        font-weight: bold;
        color: rgb(0, 123, 255);
        flex-shrink: 0;
    }
`;

const ExpenditureContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span:first-child {
        margin-bottom: 5px;
        color: rgb(102, 102, 102);
        font-size: 14px;
    }

    span:last-child {
        font-weight: bold;
        color: rgb(0, 123, 255);
        flex-shrink: 0;
`;

export default React.memo(ExpenditureList);
