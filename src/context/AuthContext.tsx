import React, { createContext, useState,useContext,ReactNode} from 'react';

//1. [ts 핵심] Context가 제공할 데이터의 타입을 정의 합니다.
interface AuthContextType{
    isLoggedIn : boolean;
    toggleLogin : () => void;
}

//2. Context객체 생성 (기본값 설정)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//3. Provider 컴포넌트 생성(실제 데이터를 관리하고 제공하는 역할)
interface AuthProviderProps {
    children : ReactNode; //하위 컴포넌트를 받기위한 타입
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn(prev => !prev);
        console.log(`로그인 상태가 ${isLoggedIn}으로 변경되었습니다`)
    }

    const value : AuthContextType = {
        isLoggedIn,
        toggleLogin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context == undefined){
        throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용해야 합니다');
    }
    return context;
}