import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts, Nunito_200ExtraLight, Nunito_300Light, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import {useState} from "react";

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fontLoaded] = useFonts({
        Nunito_200ExtraLight, 
        Nunito_300Light,
        Nunito_800ExtraBold
    });

    if(!fontLoaded) {
        return null;
    }


    return (
        <View style={style.background}>
            <View style={style.container}>
                <Text style={style.title}>Seja bem vindo!</Text>
                
                <View style={style.form}>
                    <View style={style.inputView}>
                        <Text style={style.label}>E-mail</Text>
                        <TextInput style={style.input} keyboardType="email-address" onChangeText={(text) => {setEmail(text)}}/>
                    </View>

                    <View style={style.inputView}>
                        <Text style={style.label}>Senha</Text>
                        <TextInput style={style.input} secureTextEntry={true} onChangeText={(text) => {setPassword(text)}}/>
                    </View>

                    <TouchableOpacity style={style.button} onPress={() => {console.log(password)}}>
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
        padding: 10
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