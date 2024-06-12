import styled from 'styled-components';

function Section({ children }) {
  return <SectionStyle>{children}</SectionStyle>;
}

const SectionStyle = styled.section`
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 20px;
`;

export default Section;
