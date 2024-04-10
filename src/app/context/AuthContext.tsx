import { ReactNode, createContext, useState } from "react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Token } from "@mui/icons-material";
export interface AuthContextType {
   getToken : ()=>void;
   setToken : (token:string) => void;
}
export const AuthContext = createContext<AuthContextType>({
    getToken : () => {},
    setToken : (token:string) => {}
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const[token,setAuthToken] = useState<string|undefined|null>(undefined);
    const getToken = () => {
        if(Boolean(token)) {
            return token;
        }
        const storedToken = Cookies.get('token');
        if(Boolean(storedToken)) return storedToken;
        router.push("/login");
    }
    const setToken = (token : string) => {
        Cookies.set('token',token,{expires:2});
        setAuthToken(token);
    }
    const val = {
        getToken,
        setToken
    }
    return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}