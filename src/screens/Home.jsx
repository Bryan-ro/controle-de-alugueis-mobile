import { useContext, useEffect } from "react";
import { Text, View } from "react-native"
import { LoginContext } from "../context/LoginContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
    const { updateLogin } = useContext(LoginContext);

    function loggout() {
        AsyncStorage.clear(() => {
            updateLogin(false);
        });
    }

    return (
        <View>
            <Text>Logado com sucesso</Text>

            <Text onPress={() => { loggout() }}>Deslogar</Text>
        </View>


    );
}