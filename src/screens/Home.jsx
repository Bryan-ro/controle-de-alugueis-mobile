import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import firebaseConfig from "../firebaseConfig";
import { collection, query, getDocs, getFirestore, where } from "firebase/firestore";

import AddButton from "../components/AddButton";
import Card from "../components/Card.jsx";

import { LoginContext } from "../context/LoginContext";
import { LoadingContext } from "../context/LoadingContext.jsx";

const firestore = getFirestore(firebaseConfig);

export default function Home({ navigation }) {
    const { userId } = useContext(LoginContext);
    const Loading = useContext(LoadingContext);

    const [residences, setResidences] = useState([]);

    useEffect(() => {
        Loading(true);

        getResidences().finally(() => {
            Loading(false);
        });
    }, []);

    async function getResidences() {
        const collectionRef = collection(firestore, "residencias");

        const q = query(collectionRef, where("userId", "==", userId))

        const querySnap = await getDocs(q);

        const state = [];

        querySnap.forEach((doc) => {
            const data = doc.data()

            state.push(data);
        });

        setResidences(state);
    }


    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Suas residências</Text>
            </View>

            <View style={style.addDiv}>
                <AddButton onPress={() => { navigation.navigate("AddResidence") }} addIcon={true} />
            </View>

            <View style={style.container}>
                <ScrollView style={style.scroll}>
                    {residences.map((data, index) => (
                        <Card key={index} source={{ uri: data.photo }} address={`${data.address}, ${data.number}`} quantTenant={0} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        backgroundColor: "#102C57",
        height: "100%",
    },

    titleView: {
        height: "10%",
        display: "flex",
        justifyContent: "center"
    },

    title: {
        color: "white",
        fontSize: 32,
        fontFamily: "Nunito_800ExtraBold",
        textAlign: "center"
    },

    addDiv: {
        padding: 15
    },

    container: {
        width: "100%",
        height: "80%",

        display: "flex",
        alignItems: "center"
    },

    scroll: {
        width: "85%",
    }
});