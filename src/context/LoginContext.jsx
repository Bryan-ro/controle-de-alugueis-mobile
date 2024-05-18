import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/Login";

export const LoginContext = createContext();

export function LoginStatus({ children }) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getUser = () => {
            AsyncStorage.getItem("userData")
                .then(data => {
                    try {
                        const user = JSON.parse(data).user;
                        setUserId(user.uid);
                        setEmail(user.email);

                        if (user) {
                            setLogin(true);
                        } else {
                            setLogin(false);
                        }
                    } catch {
                        setLogin(false);
                        setUserId(null);
                        setEmail(null);
                    }
                });
        }

        getUser()

        const setIntervalId = setInterval(getUser, 30000);

        return () => clearInterval(setIntervalId);
    }, [login]);

    function updateLogin(login) {
        setLogin(login);
    }

    async function logout() {
        setLogin(false);

        await AsyncStorage.clear();
    }


    const userContextValue = {
        userId,
        email,
        login,
        updateLogin,
        logout
    };

    return <LoginContext.Provider value={userContextValue}>{!login ? <Login /> : children}</LoginContext.Provider>
}