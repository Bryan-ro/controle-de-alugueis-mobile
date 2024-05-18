import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useContext } from "react";


import firebaseConfig from "../firebaseConfig.js";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import { LoginContext } from "../context/LoginContext.jsx";
import { LoadingContext } from "../context/LoadingContext.jsx";

export default function AddTenant({ route, navigation }) {
    const [name, setName] = useState(null);
    const [rentValue, setRentValue] = useState(null);
    const [dueDate, setDueDate] = useState(null);

    const { residenceId } = route.params;

    const Loading = useContext(LoadingContext);

    const addTenant = async () => {
        Loading(true);

        try {
            const store = getFirestore(firebaseConfig);

            const date = new Date()
            /* Reset Hours */ date.setHours(0, 0, 0, 0);

            await addDoc(collection(store, "tenants"), {
                name,
                rentValue: Number(rentValue),
                dueDate,
                residenceId,
                lastPayment: date
            });

            Loading(false);
            navigation.goBack();
        } catch {
            Alert.alert("Falha ao registrar as informações", "Entre em contato com o suporte.");
        }
    }

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Cadastrar novo inquilino</Text>
            </View>

            <View style={style.form}>
                <View style={style.inputView}>
                    <Text style={style.label}>Nome do inquilino</Text>
                    <TextInput style={style.input} onChangeText={(text) => { setName(text) }} />
                </View>

                <View style={style.inputView}>
                    <Text style={style.label}>Valor do aluguel</Text>
                    <TextInput style={style.input} keyboardType="number-pad" onChangeText={(text) => { setRentValue(text) }} />
                </View>

                <View style={style.inputView}>
                    <Text style={style.label}>Dia do pagamento</Text>
                    <TextInput style={style.input} keyboardType="number-pad" onChangeText={(text) => { setDueDate(text) }} />
                </View>


                <TouchableOpacity style={style.button} onPress={() => { addTenant() }}>
                    <Text style={style.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View >
    );

}

const style = StyleSheet.create({
    background: {
        backgroundColor: "#102C57",
        height: "100%",
    },

    titleView: {
        height: "20%",
        padding: 10,
        display: "flex",
        justifyContent: "center"
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
    },

    uploadButton: {
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: 200,
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    uploadText: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 16
    }
})