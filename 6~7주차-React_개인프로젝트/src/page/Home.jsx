import ExpenditureCreate from '../components/ExpenditureCreate.jsx';
import SelectMonth from '../components/SelectMonth.jsx';
import ExpenditureTotal from '../components/ExpenditureTotal.jsx';
import ExpenditureList from '../components/ExpenditureList.jsx';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

function Home({ expenditureList, createExpenditure, expenditureRef, init}) {
  const [filterExpenditureList, setFilterExpenditureList] = useState([]);
  const [expenditureTotalMap, setExpenditureTotalMap] = useState(new Map());
  const [currentMonth, setCurrentMonth] = useState(2);
  const [allCategoryTotalPrice, setAllCategoryTotalPrice] = useState(0);

  useEffect(() => {
    init();
    const localStorageMonth = localStorage.getItem('currentMonth');
    setCurrentMonth(localStorageMonth ? +localStorageMonth : new Date().getMonth());
  }, []);


  const changeCurrentMonth = useCallback(
    (selectedMonth) => {
      setCurrentMonth(selectedMonth);
    },
    [currentMonth]
  );

  useEffect(() => {
    const totalMap = new Map();
    let tempAllCategoryTotalPrice = 0;
    setFilterExpenditureList(
      expenditureList?.filter((expenditure) => {
        const isSameMonth = +expenditure.date.substring(5, 7) === currentMonth;

        //
        if (isSameMonth) {
          const beforePrice = totalMap.has(expenditure.category) ? totalMap.get(expenditure.category) : 0;
          tempAllCategoryTotalPrice += expenditure.price;
          totalMap.set(expenditure.category, beforePrice + expenditure.price);
        }

        return isSameMonth;
      })
    );

    setAllCategoryTotalPrice(tempAllCategoryTotalPrice);
    setExpenditureTotalMap(totalMap);
  }, [currentMonth, expenditureList]);

  return (
    <Main>
      <ExpenditureCreate createExpenditure={createExpenditure} expenditureRef={expenditureRef}></ExpenditureCreate>
      <SelectMonth currentMonth={currentMonth} changeCurrentMonth={changeCurrentMonth}></SelectMonth>
      <ExpenditureTotal
        expenditureTotalMap={expenditureTotalMap}
        allCategoryTotalPrice={allCategoryTotalPrice}
      ></ExpenditureTotal>
      <ExpenditureList expenditureList={filterExpenditureList} currentMonth={currentMonth}></ExpenditureList>
    </Main>
  );
}

const Main = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export default Home;
