import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../page/Home.jsx';
import Detail from '../page/Detail.jsx';
import Login from '../page/Login.jsx';
import Register from '../page/Register.jsx';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import Layout from '../components/layout/Layout.jsx';
import MyProfile from '../page/MyProfile.jsx';

function Router() {

  const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/register"
               element={<PublicRoute element={Register} />} />

        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="detail/:id"
                 element={<PrivateRoute element={Detail} />} />
          <Route path="/profile"
                 element={<PrivateRoute element={MyProfile} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
