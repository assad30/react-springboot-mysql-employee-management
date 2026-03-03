import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./pages/header/Header"
import Dashboard from './pages/dashboard/dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import CreateUser from './pages/employees/CreateUser';
import UpdateUser from './pages/employees/UpdaterUser';

function App() {
  return (
     <>
      <Header />
      <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/employees' element={<CreateUser />} />
          <Route path='/employee/:empId' element={<UpdateUser />} />
          <Route path='*' element={<NoMatch />} />
          
      </Routes>
     </>
  );
}

export default App;
