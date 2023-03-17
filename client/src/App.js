import Registration from './views/registration'
import IdeasIndex from './views/ideasIndex'
import IdeaShow from './views/ideaShow'
import UserShow from './views/userShow'
import Page404 from './views/404'
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import UserEdit from './views/UserEdit'
import { useCookies } from 'react-cookie';
import {io} from 'socket.io-client'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ user, redirectPath = '/*' }) => {
  const [cookies, setCookie] = useCookies(['user']);

  if (!cookies['user']) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route element={<ProtectedRoute />}>
          <Route path='/ideas' element={<IdeasIndex/>}/>      
          <Route path='/user/:id' element={<UserShow/>}/>
          <Route path='/idea/:id' element={<IdeaShow/>}/>
          <Route path='/user/edit' element={<UserEdit/>}/>
        </Route>
        <Route path='/*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;