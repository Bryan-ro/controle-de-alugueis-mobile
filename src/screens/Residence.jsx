import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import AddButton from "../components/AddButton.jsx"

export default function Residence({ route, navigation }) {
    const { residenceId } = route.params;

    let price = 1200;

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>Seus inquilinos</Text>
            </View>

            <View style={style.addDiv}>
                <AddButton onPress={() => { navigation.navigate("#") }} addIcon={true} />
            </View>

            <View style={style.container}>
                <ScrollView style={style.scroll}>
                    <TouchableOpacity style={style.card} onPress={() => { }}>
                        <Text style={style.cardText}>Inquilino: Tânia</Text>
                        <Text style={style.cardSecundaryText}>Valor do alguel: {price.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })}</Text>
                        <Text style={style.cardSecundaryText}>Próximo pagamento: 30 de maio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.card} onPress={() => { }}>
                        <Text style={style.cardText}>Inquilino: Tânia</Text>
                        <Text style={style.cardSecundaryText}>Valor do alguel: {price.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })}</Text>
                        <Text style={style.cardSecundaryText}>Próximo pagamento: 30 de maio</Text>
                    </TouchableOpacity>
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