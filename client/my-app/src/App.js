import logo from './logo.svg';
import Nav from './componenets/nav';
import LandingPage from './componenets/ladingPage';
import './App.css';
import Feed from './componenets/feeds';
import {Routes, Route} from "react-router-dom";
import LoginPage from './loginpage/LoginPage';
import SignupPage from './signuppage/SignupPage';
import { UserContextProvider } from './UserContext';
import PostPage from './componenets/PostPage';
import CreatePage from './componenets/CreatePage';

function App() {
  return (
 

    
    <UserContextProvider>
      <Routes>
        <Route path='/'>
            <Route index element={
              <LandingPage />
            } />
            <Route path='/login' element={
              <LoginPage />
            } />
            <Route path='/signup' element={
              <SignupPage />
            } />
            <Route path='/create' element={
              <CreatePage />
            } />
            <Route path='/post/:id' element={
              <PostPage />
            } />
        </Route>
      </Routes>
    </UserContextProvider>
    
    
  );
}

export default App;
