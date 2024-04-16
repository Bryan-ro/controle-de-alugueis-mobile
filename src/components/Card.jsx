import { Text, Image, View, StyleSheet } from "react-native";

export default function Card(props) {
    return (
        <View style={style.card}>
            <View style={style.cardImage}>
                <Image style={{ width: "100%", height: "100%", borderTopLeftRadius: 15, borderTopRightRadius: 15 }} source={props.source} />
            </View>

            <View style={style.cardTextView}>
                <Text style={style.cardText}>{props.address}</Text>

                <Text style={style.cardSubText}>Inquilinos: <Text>{props.quantTenant}</Text></Text>
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    card: {
        width: "100%",
        height: 300,
        backgroundColor: "white",
        borderRadius: 15,

        display: "flex",
        alignItems: "center",
        marginVertical: 5
    },

    cardImage: {
        height: "60%",
        width: "100%"
    },

    cardTextView: {
        width: "100%",
        height: "40%",
        borderLeftWidth: 10,
        borderColor: "#344be0",
        borderBottomLeftRadius: 10,

        display: "flex",
        justifyContent: "space-evenly"
    },

    cardText: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 18,
        paddingHorizontal: 10
    },

    cardSubText: {
        fontFamily: "Nunito_300Light",
        fontSize: 16,
        paddingHorizontal: 10
    }
})