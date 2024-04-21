import { StatusBar } from "react-native";


import { LoginStatus } from "./src/context/LoginContext.jsx";
import { Loading } from "./src/context/LoadingContext.jsx";

import Router from "./src/router";

import { useFonts, Nunito_200ExtraLight, Nunito_300Light, Nunito_800ExtraBold, Nunito_400Regular_Italic } from "@expo-google-fonts/nunito";

StatusBar.popStackEntry({
    barStyle: "default",
    backgroundColor: "black",
});

export default function App() {
    const [fontLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_800ExtraBold,
        Nunito_400Regular_Italic
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <Loading>
            <LoginStatus>
                <Router />
            </LoginStatus>
        </Loading>
    );
}
