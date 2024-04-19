import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";


import firebaseConfig from "../firebaseConfig.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { v4 as uuid } from "react-native-uuid";

import AddButton from "../components/AddButton.jsx";
import { LoginContext } from "../context/LoginContext.jsx";

import * as ImagePicker from "expo-image-picker";

export default function AddResidence() {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState({});

    const { userId } = useContext(LoginContext);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditin: true,
            quality: 1,
            allowsMultipleSelection: false,
            selectionLimit: 1,
            mediaTypes: "Images"
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        return;
    }


    const addResidence = async () => {
        const store = getStorage(firebaseConfig);

        const filename = image.substring(image.lastIndex("/") + 1);

        const storeRef = ref(store, filename);

        try {
            const response = await fetch(image);

            const blob = response.blob();

            const upload = await uploadBytes(storeRef, blob);

            console.log(upload)
        } catch (e) {
            console.log(error);
        }



    }

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Adicionar nova residência</Text>
            </View>

            <View style={style.form}>
                <View style={style.inputView}>
                    <Text style={style.label}>Logradouro</Text>
                    <TextInput style={style.input} onChangeText={(text) => { setAddress(text) }} />
                </View>

                <View style={style.inputView}>
                    <Text style={style.label}>Número</Text>
                    <TextInput style={style.input} keyboardType="number-pad" onChangeText={(text) => { setNumber(text) }} />
                </View>

                <View style={style.inputView}>
                    <AddButton text="Upload de imagem" onPress={() => { pickImage() }} />
                </View>

                <TouchableOpacity style={style.button} onPress={() => { addResidence() }}>
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
    }
})