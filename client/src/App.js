import Registration from './views/registration'
import IdeasIndex from './views/ideasIndex'
import IdeaShow from './views/ideaShow'
import UserShow from './views/userShow'
import Page404 from './views/404'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserEdit from './views/UserEdit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/ideas' element={<IdeasIndex/>}/>      
        <Route path='/user/:id' element={<UserShow/>}/>
        <Route path='/idea/:id' element={<IdeaShow/>}/>
        <Route path='/user/edit' element={<UserEdit/>}/>
        <Route path='/404' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;