import './App.css';
import Header from './Header';
import Layout from './Layout';
import Post from './Post';
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext.js';
import CreateNewArticle from './pages/CreateNewArticle';
import SinglePostPage from './pages/SinglePostPage';
import EditPost from './pages/EditPost.js';

function App() {
  return (
<UserContextProvider>
    <Routes>

    <Route path='/' element={<Layout />}> 
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/create-new-article' element={<CreateNewArticle />} />   
      <Route path='/post/:id' element={<SinglePostPage />} />
      <Route path='/post/:id/edit' element={<EditPost />} />
      
    </Route>
    </Routes>
  </UserContextProvider>




    
  );
}

export default App;
