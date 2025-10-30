import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
    userId : number;
    id : number;
    title : string;
    body : string;
}

const fetchPosts = async ():Promise<Post[]> => {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');
    console.log('api call sent')
    return response.data;
}

const QueryFetching: React.FC<{}> = () => {
    const {data : posts, isLoading, isError, error} = useQuery<Post[],Error>({
        queryKey : ['postsData'],
        queryFn : fetchPosts,
        staleTime : 5000,
    });

    if(isLoading){
        return <h2 style={{ color: 'orange' }}>⚙️ Query 로딩 중...</h2>;
    }

    if(isError){
        return <h2 style={{ color: 'red' }}>❌ 에러 발생: {error.message}</h2>;
    }
    return(
        <div style={{padding:'20px',backgroundColor:'#222',minHeight:'50vh'}}>
            <h2>🟢 Day 5: React Query 실습</h2>
            <p style={{color:'#aaa'}}>콘솔을 열고, 다른 메뉴로 이동 후 다시 돌아왔을 때 API 호출 로그가 5초 동안은 안 찍히는지 확인하세요. (캐싱 테스트)</p>
            <div style={{marginTop:'30px',textAlign:'left'}}>
                {posts?.map(post => (
                    <div key={post.id} style={{border:'1px solid #555',padding:'15px',marginBottom:'15px',borderRadius:'5px'}}>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0,100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default QueryFetching;