import React,{ useState} from 'react';
import { useAuth } from '../context/AuthContext';
import useLocalStorage from '../hook/useLocalStorage';
import useToggle from '../hook/useToggle';
import useTimeout from '../hook/useTimeout';

const ContextAndHook: React.FC<{}> = () => {
    //1. context 사용 , 전역 로그인 상태 및 토글 함수에 접근
    const {isLoggedIn , toggleLogin} = useAuth();

    const [isMenuOpen, toggleMenu] = useToggle(false);
    const [userName, setUserName] = useLocalStorage<string>('userName', '게스트');
    const [timeoutMessage, setTimeoutMessage] = useState<string>('3초후 메시지가 뜹니다');

    useTimeout(()=>{
       setTimeoutMessage(`타이머 종료! (현재 유저: ${userName})`);
    },3000)
    return(
        <div style={{padding:'20px',backgroundColor:'#222',minHeight:'50vh',border:'2px solid orange'}}>
            <h2>🟠 Day 4: Context API & Custom Hook 실습</h2>

            {/*Context Api Test */}
            <div style={{border:'1px solid #555', padding:'15px', marginBottom:'20px'}}>
                <h3>[1] Context API (전역 로그인 상태)</h3>
                <p>전역 로그인 상태: **{isLoggedIn ? '로그인됨 ✅' : '로그아웃됨 ❌'}**</p>
                <button onClick={toggleLogin} style={{padding:'8px 15px', backgroundColor:isLoggedIn ? 'red' : 'green'}}>
                    {isLoggedIn ? '로그아웃' : '로그인'}
                </button>
            </div>
            {/*Custom Hook Test */}
            <div style={{border: '1px solid #555', padding:'15px'}}>
                <h3>[2] Custom Hook (useToggle)</h3>
                <p>메뉴 상태 : **{isMenuOpen ? '열림' : '닫힘'}**</p>
                <button onClick={toggleMenu} style={{padding:'8px 15px'}}>
                    메뉴 { isMenuOpen ? '닫기' : '열기'}
                </button>
                {isMenuOpen && <p style={{color:'#61dafb'}}>토글 훅으로 열린 내용입니다</p>}
            </div>
            <div style={{ border: '1px solid orange', padding: '15px', marginTop: '20px' }}>
                <h3>[3] Custom Hook (useLocalStorage)</h3>
                <p>저장된 유저: <b>{userName}</b></p>
                <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} // 상태 업데이트 시 로컬 스토리지에 자동 저장
                style={{ padding: '5px', marginRight: '10px' }}
                />
                <p style={{ color: '#aaa', fontSize: '0.9em' }}>
                    새로고침 후에도 입력된 값이 유지되는지 확인하세요.
                </p>
            </div>
            <div style={{ border: '1px solid lightgreen', padding: '15px', marginTop: '20px' }}>
                <h3>[4] Custom Hook (useTimeout)</h3>
                <p style={{ color: 'lightgreen' }}>{timeoutMessage}</p>
                <button onClick={() => setTimeoutMessage(`새로운 타이머 시작... (${new Date().toLocaleTimeString()})`)}>
                메시지 재시작
                </button>
            </div>
        </div>
    )
}
export default ContextAndHook;