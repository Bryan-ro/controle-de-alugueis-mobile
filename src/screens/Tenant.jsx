import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Tenant({ route }) {
    const { id, name, lastPayment, nextPayment } = route.params;

    const lastDate = new Date(lastPayment.seconds * 1000 + lastPayment.nanoseconds / 1000000);

    const formattedDate = lastDate.toLocaleString("pt-BR", { dateStyle: "short" });

    const currentDate = new Date();

    return (
        <View style={style.background}>
            <View style={style.titleView}>
                <Text style={style.title}>{name}</Text>
            </View>

            <View>
                <View style={style.infoContainer}>
                    <Text style={style.infoText}>Último Pagamento: </Text>
                    <Text style={style.infoText}>{formattedDate}</Text>
                </View>

                <View style={style.infoContainer}>
                    <Text style={style.infoText}>Próximo pagamento: </Text>
                    <Text style={style.infoText}>{nextPayment}</Text>
                </View>
            </View>

            <View>

                <View style={style.titleView}>
                    <Text style={style.title}>Histórico</Text>
                </View>

                <View style={style.container}>
                    <ScrollView style={style.scroll}>
                        <TouchableOpacity
                            style={style.card}
                            onPress={() => { }} >
                            <Text style={style.cardText}>{currentDate.toLocaleDateString("pt-BR", { dateStyle: "medium" })}</Text>
                            <Text style={style.cardSecundaryText}>Valor pago: R$ 1350,00</Text>
                            <Text style={style.cardSecundaryText}>Pago com atraso</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
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
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    deleteIcon: {
        width: 35,
        height: 35
    },

    infoContainer: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 8
    },

    infoText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
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

        marginVertical: 5,

        borderColor: "#344be0"
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