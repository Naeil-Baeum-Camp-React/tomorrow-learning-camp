import Top from './Top.jsx';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
  return (
    <LayoutWrapper>
      <Top />
      <Contents>
        <Outlet />
      </Contents>
    </LayoutWrapper>
  )
    ;
}

const LayoutWrapper = styled.div`
    width: 100%;
    height: auto;
`;

const Contents = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

export default Layout;