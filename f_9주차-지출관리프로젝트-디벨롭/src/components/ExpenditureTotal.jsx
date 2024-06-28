import Section from './common/Section.jsx';
import styled from 'styled-components';
import { useMemo } from 'react';

function ExpenditureTotal({ expenditureTotalMap, allCategoryTotalPrice }) {
  const colorMap = useMemo(() => getColor(), []);

  const amountWrapChildrenJsxList = [];
  const graphBarJsxList = [];

  let index = 1;
  for (const key of expenditureTotalMap.keys()) {
    const ratio = ((expenditureTotalMap.get(key) / allCategoryTotalPrice) * 100).toFixed(2); //각 지출 마다 비율 계산
    const color = colorMap.get((index++).toString()); // 각 항목마다 색 지정

    // 스타일 컴포넌트 push
    amountWrapChildrenJsxList.push(
      <Amount key={key}>
        <Mark $color={color}></Mark>
        {key}: {expenditureTotalMap.get(key)} 원 ({ratio}%)
      </Amount>,
    );

    // 스타일 컴포넌트 push
    graphBarJsxList.push(<GraphBar key={color} $ratio={ratio}
                                   $color={color} />);
  }

  return (
    <Section>
      <TotalWrap>
        2월 총
        지출: {allCategoryTotalPrice}원<TotalGraph>{graphBarJsxList}</TotalGraph>
        <AmountWrap>{amountWrapChildrenJsxList}</AmountWrap>
      </TotalWrap>
    </Section>
  );
}

const getColor = () => {
  return new Map(
    Object.entries(
      {
        1: ' #000000 ',
        2: ' #A52A2A ',
        3: ' #FF0000 ',
        4: ' #00FF00 ',
        5: ' #0000FF ',
        6: ' #FFFF00 ',
        7: ' #00FFFF ',
        8: ' #FF00FF ',
        9: ' #C0C0C0 ',
        10: ' #808080 ',
        12: ' #008000 ',
        13: ' #808000 ',
        14: ' #000080 ',
        15: ' #800080 ',
        16: ' #008080 ',
        17: ' #FF8080 ',
        18: ' #80FF80 ',
        19: ' #8080FF ',
        20: ' #FFFF80 ',
        21: ' #80FFFF ',
        22: ' #FF80FF ',
        23: ' #FFA500 ',
        24: ' #FA8072 ',
        25: ' #7FFFD4 ',
        26: ' #ADD8E6 ',
        27: ' #DDA0DD ',
        28: ' #90EE90 ',
        29: ' #F08080 ',
        30: ' #EE82EE ',
        31: ' #FFB6C1 ',
        32: ' #FFC0CB ',
        33: ' #FFDAB9 ',
        34: ' #AFEEEE ',
        35: ' #D8BFD8 ',
        36: ' #F0E68C ',
        37: ' #E6E6FA ',
        38: ' #FFFFE0 ',
        39: ' #00CED1 ',
        40: ' #9370DB ',
        41: ' #BA55D3 ',
        42: ' #1E90FF ',
        43: ' #00FA9A ',
        44: ' #48D1CC ',
        45: ' #87CEEB ',
        46: ' #00BFFF ',
        47: ' #B0C4DE ',
        48: ' #B0E0E6 ',
        49: ' #4169E1 ',
        50: ' #6495ED ',
        51: ' #00008B ',
        52: ' #008B8B ',
        53: ' #B22222 ',
        54: ' #DC143C ',
        55: ' #8B0000 ',
        56: ' #8FBC8F ',
        57: ' #2E8B57 ',
        58: ' #3CB371 ',
        59: ' #20B2AA ',
        60: ' #008000 ',
        61: ' #006400 ',
        62: ' #9ACD32 ',
        63: ' #ADFF2F ',
        64: ' #556B2F ',
        65: ' #6B8E23 ',
        66: ' #808000 ',
        67: ' #FFFF00 ',
        68: ' #DAA520 ',
        69: ' #CD853F ',
        70: ' #D2691E ',
        71: ' #8B4513 ',
        72: ' #A0522D ',
      },
      [],
    ),
  );
};

const TotalWrap = styled.div`
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

const TotalGraph = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    height: 40px;
    background-color: rgb(233, 236, 239);
    border-radius: 8px;
    overflow: hidden;
`;

const GraphBar = styled.div`
    height: 100%;
    background-color: ${(props) => props.$color};
    width: ${(props) => props.$ratio}%;
    transition: width 0.2s ease-in-out 0s;
`;

const AmountWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const Amount = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgb(85, 85, 85);
`;

const Mark = styled.div`
    width: 20px;
    height: 10px;
    background-color: ${(props) => props.$color};
    margin-right: 8px;
`;

export default ExpenditureTotal;
