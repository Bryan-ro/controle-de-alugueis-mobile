import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AddButton from "../components/AddButton.jsx";

import firebaseConfig from "../firebaseConfig.js";

import { collection, query, getDocs, getFirestore, where, doc, deleteDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { LoadingContext } from "../context/LoadingContext.jsx";

export default function Residence({ route, navigation }) {
    const { residenceId } = route.params;
    const Loading = useContext(LoadingContext);

    const [tenants, setTenants] = useState([]);

    const firestore = getFirestore(firebaseConfig);

    useEffect(() => {
        async function renderTenants() {
            Loading(true)

            const collectionRef = collection(firestore, "tenants");
            const q = query(collectionRef, where("residenceId", "==", residenceId));
            const querySnap = await getDocs(q);

            const data = querySnap.docs.map(async doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                };
            })

            const tenants = await Promise.all(data);

            setTenants(tenants);

            Loading(false)
        }

        renderTenants();
    }, []);


    function deleteResidence() {
        const deleteResidence = async () => {
            const docRef = doc(firestore, "residences", residenceId);

            await deleteDoc(docRef);


            const collectionRef = collection(firestore, "tenants");
            const q = query(collectionRef, where("residenceId", "==", residenceId));
            const querySnap = await getDocs(q);

            const deleteTenants = querySnap.docs.map(docSnapshot => deleteDoc(docSnapshot.ref));

            await Promise.all(deleteTenants);

            navigation.goBack();
        }

        Alert.alert("Deseja mesmo realizar está operação?", "Todos os inquilinos desta residencia e a residência serão excluidos permanentementes. ", [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Excluir',
                onPress: () => deleteResidence(),
            },
        ])
    }

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Seus inquilinos</Text>
            </View>

            <View style={style.addDiv}>
                <AddButton onPress={() => { navigation.navigate("AddTenant", { residenceId }) }} addIcon={true} />

                <TouchableOpacity onPress={() => deleteResidence()}>
                    <Image style={style.deleteIcon} source={require("../public/deleteIcon.png")} />
                </TouchableOpacity>
            </View>

            <View style={style.container}>
                <ScrollView style={style.scroll}>
                    {tenants.map((data, index) => {
                        const date = new Date(data.lastPayment.seconds * 1000 + data.lastPayment.nanoseconds / 1000000);
                        /*Next payment month */ date.setMonth(date.getMonth() + 1);
                        /*Next payment day */ date.setDate(date.getDay() - date.getDay() + data.dueDate);

                        const formattedDate = date.toLocaleString("pt-BR", { dateStyle: "short" });

                        const currentDate = new Date();

                        return (
                            <TouchableOpacity
                                key={index}
                                style={
                                    {
                                        ...style.card,
                                        borderColor: currentDate < date ? "#344be0" : "red"
                                    }
                                }
                                onPress={() => { navigation.navigate("Tenant", { ...data, nextPayment: formattedDate }) }} >
                                <Text style={style.cardText}>Inquilino: {data.name}</Text>
                                <Text style={style.cardSecundaryText}>Valor do alguel: {data.rentValue.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })}</Text>
                                <Text style={style.cardSecundaryText}>{currentDate < date ? "Próximo pagamento" : "Pagamento atrasado"}: {formattedDate}</Text>
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
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    deleteIcon: {
        width: 35,
        height: 35
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