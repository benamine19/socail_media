import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { when_user_reload_page } from "./redux/user_loginRducer";
import {jwtDecode} from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux'
import Cc from "./pages/Cc";

function App() {
  // const state=useSelector(state=>state.user_login)


  return (
<div className="App">
<BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
              <Route path='Home' element={<Home/>}/>
              <Route path='Login' element={<Login />}/>
              <Route path='Register' element={<Register />}/>
      </Route>
      <Route path='/Cc' element={<Cc/>}/>

    </Routes>
</BrowserRouter>
</div>
  );
}

export default App;
