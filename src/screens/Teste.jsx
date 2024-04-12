import { useContext } from "react";
import { Text } from "react-native"
import { LoginContext } from "../context/LoginContext";

export default function Teste() {
    const ctx = useContext(LoginContext);

    console.log(ctx);

    return (
        <Text>Olá</Text>
    );
}