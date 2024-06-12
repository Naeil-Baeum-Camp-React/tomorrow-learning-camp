import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home.jsx';
import Detail from './page/Detail.jsx';
import GlobalStyle from './components/common/GlobalStyles.jsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const regex = useMemo(() => RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/), []);
  const [expenditureList, setExpenditureList] = useState([]);

  const expenditureRef = useRef({
    priceRef: useRef(),
    categoryRef: useRef(),
    descriptionRef: useRef(),
    dateRef: useRef(),
  });

  // changeCurrentMonth(월 변경 함수)에 의해 main이 리렌더링 되더라도 ExpenditureCreate 컴포넌트는 리렌더링 되지 않기 위해 useCallback 사용
  const createExpenditure = useCallback(
    (createdExpenditure) => {
      if (!valid(createdExpenditure)) {
        return;
      }
      setExpenditureList((expenditureList) => {
        const newExpenditureList = [...expenditureList, createdExpenditure];
        setLocalStorage('expenditureList', newExpenditureList);
        return newExpenditureList;
      });

      return true;
    },
    [expenditureList]
  );

  let setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const localStorageExpenditureList = localStorage.getItem('expenditureList');
    setExpenditureList(localStorageExpenditureList ? JSON.parse(localStorageExpenditureList) : []);
  }

  const updateExpenditure = useCallback(
    (updatedExpenditure) => {
      if (!valid(updatedExpenditure)) {
        return;
      }
      setExpenditureList((expenditureList) => {
        const newExpenditureList = expenditureList.map((expenditure) => {
          if (expenditure.id === updatedExpenditure.id) {
            Object.assign(expenditure, updatedExpenditure);
          }
          return expenditure;
        });

        setLocalStorage('expenditureList', newExpenditureList);
      });

      return true;
    },
    [expenditureList]
  );

  const deleteExpenditure = useCallback(
    (expenditureId) => {
      setExpenditureList((expenditureList) => {
        const newExpenditureList = expenditureList.filter((expenditure) => expenditureId !== expenditure.id);
        setLocalStorage('expenditureList', newExpenditureList);
        return newExpenditureList;
      });
    },
    [expenditureList]
  );

  const valid = (expenditure) => {
    if (!regex.test(expenditure.date)) {
      alert('날짜는 yyyy-mm-dd 형식으로 해주세요.');
      expenditureRef.current.dateRef.current.focus();
      return false;
    } else if (!expenditure.category) {
      expenditureRef.current.categoryRef.current.focus();
      alert('항목을 입력해주세요.');
      return false;
    } else if (!expenditure.price) {
      alert('금액을 입력해주세요.');
      expenditureRef.current.priceRef.current.focus();
      return false;
    } else if (!expenditure.description) {
      expenditureRef.current.descriptionRef.current.focus();
      alert('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                init={init}
                expenditureList={expenditureList}
                createExpenditure={createExpenditure}
                expenditureRef={expenditureRef}
              />
            }
          />
          <Route
            path="detail/:id"
            element={
              <Detail
                updateExpenditure={updateExpenditure}
                deleteExpenditure={deleteExpenditure}
                expenditureRef={expenditureRef}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
