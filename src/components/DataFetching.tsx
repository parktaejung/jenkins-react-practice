import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Post{
    userId : number;
    id : number;
    title : string;
    body : string;
}

const DataFetching: React.FC<{}> = () => {
    const [posts,setPosts] = useState<Post[]>([]);
    const [isLoading , setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchPost = async () => {
            try{
                const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');
                setPosts(response.data);
            }catch(error){
                console.error('데이터 가져오기 실패:', error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchPost();
    },[])

    if(isLoading){
        return <h2 style={{color:'#61dafb', marginTop:'50px'}}>데이터 불러오는중....</h2>
    }

    return(
        <div style={{padding:'20px',backgroundColor:'#222',minHeight:'50vh'}}>
            <h2>Day3 : 데이터 통신 (axios + useEffect) 실습</h2>
            <div style={{marginTop:'30px',textAlign:'left'}}>
                {posts.map(post=>(
                    <div key={post.id} style={{border:'1px solid #555', padding:'15px', marginBottom:'15px',borderRadius:'5px' }}>
                        <h3 style={{color:'#aaa',fontSize:'1em',margin:'0 0 5px 0'}}>Post Id: {post.id}</h3>
                        <h2 style={{color:'white',margin:'0 0 10px 0'}}>{post.title}</h2>
                        <p style={{color:'#ccc',margin:0}}>{post.body.substring(0,100)}...</p>
                    </div>

                ))}
            </div>

        </div>
    )
}
export default DataFetching;