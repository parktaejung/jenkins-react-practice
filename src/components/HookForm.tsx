import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

interface FormInput{
    email : string;
    password : string;
}

const HookForm: React.FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState : {errors, isSubmitting},
    } = useForm<FormInput>();

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        console.log("폼제출시도",data);
        //실제 현업 여기서 data를 axios 백엔드 서버에 전송합니다.
        await new Promise(resolve => setTimeout(resolve,2000));
        console.log("제출 성공 및 백엔드 전송완료");
    }

    return(
        <div style={{padding:'20px', backgroundColor:'#222', minHeight:'50vh'}}>
            <h2>🔵 Day 5: React Hook Form 실습</h2>
            <p>폼 입력 관리 및 유효성 검사를 자동화합니다</p>
            <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:'400px', margin: '30px auto', padding: '20px', border: '1px solid #007bff', borderRadius: '8px', textAlign: 'left' }}>
                <label htmlFor='email'>이메일:</label>
                <input 
                    id="email" 
                    type="email"
                    {...register("email",{
                        required: "이메일은 필수입니다",
                        pattern:{
                            value:/^\S+@\S+$/i,
                            message : "유효한 이메일 형식이 아닙니다"
                        }
                    })}
                    style={{width:'100%',padding:'8px',margin:'5px 0 10px 0', boxSizing:'border-box'}} />

                {errors.email && <p style={{color:'red',fontSize:'0.9em'}}>{errors.email.message}</p>}
                <label htmlFor='password'>비밀번호:</label>
                <input 
                    id="password"
                    type="password"
                    {...register("password",{
                        required : "비밀번호는 필수입니다",
                        minLength:{
                            value:6,
                            message:"비밀번호는 6자 이상이어야 합니다"
                        }
                    })}
                    style={{width:'100%',padding:'8px',margin:'5px 0 20px 0',boxSizing:'border-box'}} />
                {errors.password && <p style={{color:'red',fontSize:'0.9em'}}>{errors.password.message}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{width:'100%',padding:'10px',backgroundColor:isSubmitting ? '#444' : '#007bff', color:'white',border:'none', borderRadius:'5px',cursor:'pointer'}}>
                        {isSubmitting ? '제출 중...' : '로그인 시도'}
                    </button>
            </form>
        </div>
    )
}
export default HookForm;