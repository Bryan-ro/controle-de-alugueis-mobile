import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import AddButton from "../components/AddButton.jsx";

import firebaseConfig from "../firebaseConfig.js";

import { collection, query, getDocs, getFirestore, where, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Residence({ route, navigation }) {
    const { residenceId } = route.params;

    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        async function renderTenants() {
            const firestore = getFirestore(firebaseConfig);
            const collectionRef = collection(firestore, "tenants");
            const q = query(collectionRef, where("residenceId", "==", residenceId));
            const querySnap = await getDocs(q);

            const data = querySnap.docs.map(async doc => {
                return doc.data();
            })

            const tenants = await Promise.all(data);

            setTenants(tenants);
        }

        renderTenants();
    }, []);

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Seus inquilinos</Text>
            </View>

            <View style={style.addDiv}>
                <AddButton onPress={() => { navigation.navigate("AddTenant", { residenceId }) }} addIcon={true} />
            </View>

            <View style={style.container}>
                <ScrollView style={style.scroll}>
                    {tenants.map(data => {
                        const date = new Date(data.lastPayment.seconds * 1000 + data.lastPayment.nanoseconds / 1000000);
                        /*Next payment month */ date.setMonth(date.getMonth() + 1);
                        /*Next payment day */ date.setDate(date.getDay() - date.getDay() + data.dueDate);

                        const formattedDate = date.toLocaleString("pt-BR", { dateStyle: "short" });

                        return (
                            <TouchableOpacity style={style.card} onPress={() => { }}>
                                <Text style={style.cardText}>Inquilino: {data.name}</Text>
                                <Text style={style.cardSecundaryText}>Valor do alguel: {data.rentValue.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })}</Text>
                                <Text style={style.cardSecundaryText}>Próximo pagamento: {formattedDate}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
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
        width: "80%",
    },

    card: {
        backgroundColor: "white",
        width: "100%",
        height: 100,
        borderRadius: 10,
        padding: 10,

        borderLeftWidth: 10,
        borderColor: "#344be0",

        marginVertical: 5
    },

    cardText: {
        fontFamily: "Nunito_800ExtraBold",
        color: "black",
        fontSize: 18,
        textAlign: "center",
        paddingBottom: 10
    },

    cardSecundaryText: {
        fontFamily: "Nunito_400Regular_Italic",
        color: "black",
        fontSize: 16,
    },
})