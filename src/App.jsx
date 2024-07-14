import './App.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Users from './pages/Users';
import ProtectedRoutes from './utils/ProtecteRoutes';
import { ToastContainer } from 'react-toastify';
import './pages/pagesStyle/crud.css';
import './pages/pagesStyle/pages.css';
import './pages/pagesStyle/crudPop.css';
import './pages/pagesStyle/table.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Alcantarillas from './pages/Alcantarillas';
import MyHistory from './pages/MyHistory';

function App() {
  const userDataJSON = localStorage.getItem('userData'); // Obtener la cadena JSON de localStorage
  const userData = JSON.parse(userDataJSON);

  return (
    <>
      <ToastContainer />
      {userData && <Header userData={userData} />}

      <Routes>
        <Route path="/log-in" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/datos" element={<Alcantarillas />} />
          <Route
            path="/my-history"
            element={<MyHistory userData={userData} />}
          />{' '}
        </Route>
      </Routes>
    </>
  );
}

export default App;
