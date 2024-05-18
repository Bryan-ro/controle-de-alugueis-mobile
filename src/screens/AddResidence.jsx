import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useContext } from "react";


import firebaseConfig from "../firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import { LoginContext } from "../context/LoginContext.jsx";
import { LoadingContext } from "../context/LoadingContext.jsx";

import * as ImagePicker from "expo-image-picker";

export default function AddResidence({ navigation }) {
    const [address, setAddress] = useState(null);
    const [number, setNumber] = useState(null);
    const [image, setImage] = useState(null);

    const { userId } = useContext(LoginContext);
    const Loading = useContext(LoadingContext);

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

            console.log(result.assets[0]);
        }

        return;
    }

    const uploadImageOnFirebaseStorage = async () => {
        try {
            const store = getStorage(firebaseConfig);

            const fileName = image.substring(image.lastIndexOf("/") + 1);

            const imageRef = ref(store, `/images/${fileName}`);

            const response = await fetch(image);
            const blob = await response.blob();

            await uploadBytes(imageRef, blob);

            const imageUrl = await getDownloadURL(imageRef);

            return imageUrl;
        } catch {
            Alert.alert("Erro ao realizar Upload de imagem.", "Entre em contato com o suporte.");
        }
    }


    const createResidenceOnFireStore = async (imageUrl) => {
        try {
            const store = getFirestore(firebaseConfig);

            await addDoc(collection(store, "residences"), {
                address,
                number,
                photo: imageUrl,
                userId
            });
        } catch {
            Alert.alert("Falha ao registrar as informações", "Entre em contato com o suporte.");
        }
    }

    const addResidence = async () => {
        Loading(true);

        if (!image || !address || !number) {
            return Alert.alert("Erro ao adicionar residência.", "Verifique se todos os campos foram preenchidos.");
        }

        const imageUrl = await uploadImageOnFirebaseStorage();
        await createResidenceOnFireStore(imageUrl);

        Loading(false);
        navigation.goBack();
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

                <TouchableOpacity style={style.uploadButton} onPress={() => pickImage()}>
                    <Text style={style.uploadText}>Upload de imagem</Text>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
                </TouchableOpacity>


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