import styled from 'styled-components';
import Section from './Section.jsx';

function Empty() {
  return (
    <Section>
      <StContents>
        지출 내역을 추가해주세요.
      </StContents>
    </Section>
  );
}

const StContents = styled.div`
    text-align: center;
`;
export default Empty;