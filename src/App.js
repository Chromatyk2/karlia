import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
function App(props) {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }
  return(
      <>
        {cookies.user !== undefined &&
            <BrowserRouter>
              <NavBar cookies={cookies} />
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
              {/*<Footer cookies={cookies} />*/}
            </BrowserRouter>
        }
      </>
  );
}

export default App;
