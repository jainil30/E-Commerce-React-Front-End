import { createContext, useContext, useState } from "react"
import { useGlobalContext } from "./GlobalProvider";
import { useNavigate } from "react-router-dom";
import { loginUser, signUpUser } from "../API";

export const authContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const { setLoading } = useGlobalContext();

    const [authToken, setAuthToken] = useState(
        localStorage.getItem("ecomm-react-token")
            ? localStorage.getItem("ecomm-react-token")
            : null
    );

    const login = (data: { email: string, password: string }) => {
        setLoading(true);
        loginUser(data)
            .then((res) => {
                setLoading(false);
                if(res.data.authToken) {
                    localStorage.setItem("ecomm-react-token", res.data.authToken)
                    setAuthToken(res.data.authToken)
                    navigate('/')
                }else {
                    console.log("Failed to login", res.data)
                    if(res.data.error) {
                        alert(res.data.error);
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to login");
                console.log(error);
            });
    }

    const signUp = (data: { name: string, email: string, password: string }) => {
        setLoading(true);
        signUpUser(data)
            .then((res) => {
                setLoading(false);
                if(res.data.authToken) {
                    navigate('/login')
                }else {
                    console.log("Failed to signup", res.data)
                    if(res.data.error) {
                        alert(res.data.error);
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to signup");
                console.log(error);
            });
    };

    const logoutUser = () => {
        localStorage.removeItem("ecomm-react-token")
        navigate('/login')
    }

    return (
        <authContext.Provider value={{ signUp, login, authToken, logoutUser }}>
            { children }
        </authContext.Provider>
    )
}

export const useAuthContext = () => {
    if(!authContext) {
        console.log("authContext only can be used within AuthProvider")
        return null
    }
    return useContext(authContext)
}

export default AuthProvider