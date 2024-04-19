import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";



export default function CreateIcon(props) {
    return (
        <TouchableOpacity style={style.container} onPress={props.onPress}>
            {props.addIcon && <Image source={require("../public/addIcon.png")} style={style.addIcon} />}

            <Text style={style.addText}>{props.text ? props.text : "Adicionar"}</Text>
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 40,
        width: 150,
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        padding: 1
    },

    addIcon: {
        width: 35,
        height: 35
    },

    addText: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 16
    }
})