import Section from './Section.jsx';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

function Loading() {
  return (
    <Section>
      <StContents>
        <BeatLoader>
        </BeatLoader>
      </StContents>
    </Section>
  );
}

const StContents = styled.div`
    text-align: center;
`;

export default Loading;