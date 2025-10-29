import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. root 엘리먼트를 찾습니다.
const rootElement = document.getElementById('root');

// 2. [수정]: root 엘리먼트가 존재하지 않을 경우를 대비하여 에러를 발생시켜야 합니다.
// 현업에서는 이처럼 타입 에러를 명시적으로 처리해주는 것이 중요합니다.
if (!rootElement) {
  throw new Error("Failed to find the root element with ID 'root'");
}

// 3. ReactDOM.createRoot는 이제 null이 아닌 HTML Element를 받습니다.
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();