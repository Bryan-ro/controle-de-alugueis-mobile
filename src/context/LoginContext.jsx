import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginContext = createContext();

export function LoginStatus({ children }) {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getUser = () => {
            AsyncStorage.getItem("userData").then(data => {
                const user = JSON.parse(data).user;
                setUserId(user.uid);
                setEmail(user.email);
            });
        }

        getUser()
    }, []);


    const userContextValue = {
        userId: userId,
        email: email
    };

    return <LoginContext.Provider value={userContextValue}>{children}</LoginContext.Provider>
}