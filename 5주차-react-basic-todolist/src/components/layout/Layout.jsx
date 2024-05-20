import Header from './Header.jsx';

function Layout({ children }) {
  return (
    <div style={LayoutStyle}>
      <Header />
      {children}
    </div>
  );
}

const LayoutStyle = {
  margin: '0 auto 0 auto',
  maxWidth: '1200px',
  minWidth: '800px',
  height: '100vh',
};

export default Layout;
