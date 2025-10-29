import React, {useState, useEffect} from 'react';

const Counter: React.FC<{}> = () => {
    const [count , setCount] = useState<number>(0);
    const [isEven, setIsEven] = useState<boolean>(true);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
        setIsEven((count + 1) % 2 === 0);
    }

    useEffect(() => {
        document.title = `클릭 횟수 : ${count}`;
        console.log(`useEffect실행 : 카운트가 ${count}로 변경됨`)
    },[count]);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            console.log("3초가 지났습니다")
        },3000)

        return () =>{
            clearTimeout(timer);
            console.log("타이머 해제");
        }
    },[count])

    return(
      
            <div style={{border: '2px solid #61dafb', padding:'20px',margin:'20px',borderRadius:'8px',backgroundColor:'#282c34'}}>
                 <h2>⚛️ Day 2: useState, useEffect 실습</h2>
                <p style={{fontSize:'2em',margin:'20px'}}>
                    현재 카운트: **{count}**
                </p>
                <p>상태 : {isEven ? '짝수입니다' : '홀수입니다'}</p>
                <button onClick={increment} style={{padding:'10px 20px',fontSize:'1.2em'}}>
                    카운트증가!
                </button>
            </div>

    )
}
export default Counter;