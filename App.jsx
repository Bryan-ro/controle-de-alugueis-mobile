import { StatusBar } from "react-native";


import { LoginStatus } from "./src/context/LoginContext";
import Router from "./src/router";

import { useFonts, Nunito_200ExtraLight, Nunito_300Light, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";

StatusBar.popStackEntry({
    barStyle: "default",
    backgroundColor: "black",
});

export default function App() {
    const [fontLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_800ExtraBold
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <LoginStatus>
            <Router />
        </LoginStatus>
    );
}
