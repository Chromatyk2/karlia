import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import HomePage from './component/home.js';
import DeletePage from './component/delete.js';
function App() {
  return(
      <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/delete" element={<DeletePage />} />
              </Routes>
            </BrowserRouter>
      </>
  );
}

export default App;
