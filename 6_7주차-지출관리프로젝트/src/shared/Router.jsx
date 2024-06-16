import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home.jsx';
import Detail from '../page/Detail.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
