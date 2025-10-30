// src/App.tsx

import React from 'react'; // React.FC를 사용하기 위해 필요
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './components/Counter';
import DataFetching from './components/DataFetching';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ContextAndHook from './components/ContextAndHook';

const Home: React.FC<{}> = () =>(
  <h2 style={{marginTop: '50px'}}>
      좌측 메뉴에서 실습할 항목을 선택해주세요 혜진!
  </h2>
)
const App: React.FC<{}> = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App" style={{display:'flex'}}>
        <nav style={{width:'250px',padding:'20px',borderRight: '1px solid #444', height: '100vh', textAlign: 'left', backgroundColor: '#333' }}>
          <h1 style={{color:'#61dafb'}}>React 실습</h1>
          <hr style={{borderColor:'#555'}}></hr>
          <ul style={{listStyle:'none',padding:0}}>
            <li style={{marginBottom:'15px'}}>
              <Link to="/" style={{color:'white',textDecoration:'none'}}>
              🏠 홈
              </Link>
            </li>
            <li style={{marginBottom:'15px'}}>
              <Link to="/day2-hook" style={{color:'white',textDecoration:'none'}}>
              ⚛️ Day 2: useState, useEffect 실습
              </Link>
            </li>
             <li style={{marginBottom:'15px'}}>
              <Link to="/day3-fetch" style={{color:'white',textDecoration:'none'}}>
              📡 Day 3: 데이터 통신 (axios) 실습
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/day4-context-hook" style={{ color: 'white', textDecoration: 'none' }}>
                🟠 Day 4: Context & Custom Hook 실습
              </Link>
            </li>
          </ul>
        </nav>

        <main style={{flexGrow:1, padding:'20px',backgroundColor:'#282c34',color: 'white'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/day2-hook" element={<Counter />} />
            <Route path="/day3-fetch" element={<DataFetching />} />
            <Route path="/day4-context-hook" element={<ContextAndHook />} />
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;