import GlobalStyle from './GlobalStyles.jsx';
import Router from './shared/Router.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
