import { View } from "react-native";

export default function Residence({ route, navigation }) {
    const { residenceId } = route.params;

    console.log(residenceId);
    return (
        <View>

        </View>
    )
}