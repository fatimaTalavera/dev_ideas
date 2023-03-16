import Registration from './views/registration'
import IdeasIndex from './views/ideasIndex'
import IdeaShow from './views/ideaShow'
import UserShow from './views/userShow'
import Page404 from './views/404'
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import UserEdit from './views/UserEdit'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ user, redirectPath = '/*' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const [user, setUser] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration setUser={setUser}/>} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path='/ideas' user={user} element={<IdeasIndex/>}/>      
          <Route path='/user/:id' user={user} element={<UserShow/>}/>
          <Route path='/idea/:id' user={user} element={<IdeaShow/>}/>
          <Route path='/user/edit' user={user} element={<UserEdit/>}/>
        </Route>
        <Route path='/*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;