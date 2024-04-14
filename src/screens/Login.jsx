import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useFonts, Nunito_200ExtraLight, Nunito_300Light, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { useState, useContext, useEffect } from "react";

import firebase from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginContext } from "../context/LoginContext";

const auth = getAuth(firebase);

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginStatus = useContext(LoginContext);

    const [fontLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_800ExtraBold
    });

    if (!fontLoaded) {
        return null;
    }

    async function getCredential() {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);

            await AsyncStorage.setItem("userData", JSON.stringify(user));

            loginStatus.updateLogin(true);
            console.log(loginStatus.login)
        } catch (error) {
            Alert.alert("Tente novamente!", "O usuário ou senha inseridos, são inválidos.")
        }
    }

    async function forgotPassword() {
        try {
            await sendPasswordResetEmail(auth, email);

            Alert.alert("Solicitação enviada com sucesso", "Verifique a caixa de entrada e spam no seu e-mail.");
        } catch (error) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) Alert.alert("E-mail inválido", "O campo e-mail está vázio ou é inválido.");
            else Alert.alert("Erro desconhecido", "Tente novamente mais tarde");
        }
    }

    return (
        <View style={style.background}>
            <View style={style.container}>
                <Text style={style.title}>Seja bem-vindo!</Text>

                <View style={style.form}>
                    <View style={style.inputView}>
                        <Text style={style.label}>E-mail</Text>
                        <TextInput style={style.input} keyboardType="email-address" onChangeText={(text) => { setEmail(text) }} />
                    </View>

                    <View style={style.inputView}>
                        <Text style={style.label}>Senha</Text>
                        <TextInput style={style.input} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />

                        <Text style={style.forgotPass} onPress={() => forgotPassword()}>Esqueci minha senha</Text>
                    </View>

                    <TouchableOpacity style={style.button} onPress={() => { getCredential() }}>
                        <Text style={style.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    background: {
        backgroundColor: "#102C57",
        height: "100%",
    },

    container: {
        height: "100%",
        display: "flex",
        justifyContent: "space-around"
    },

    title: {
        color: "white",
        fontSize: 32,
        fontFamily: "Nunito_800ExtraBold",
        textAlign: "center"
    },

    form: {
        height: "60%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 20
    },

    inputView: {
        width: "90%",
        display: "flex"
    },

    label: {
        padding: 10,
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 20,
        color: "white"
    },

    input: {
        backgroundColor: "white",
        fontFamily: "Nunito_300Light",
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30
    },

    forgotPass: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontFamily: "Nunito_800ExtraBold",
        color: "white"
    },

    button: {
        backgroundColor: "#0ca7ff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
        width: "90%"
    },

    buttonText: {
        fontFamily: "Nunito_800ExtraBold",
        color: "white",
        fontSize: 18,
        textAlign: "center"
    }
})