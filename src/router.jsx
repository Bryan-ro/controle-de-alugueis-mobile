import "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import AddResidence from "./screens/AddResidence";
import Residence from "./screens/Residence";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddResidence" component={AddResidence} />
                <Stack.Screen name="Residence" component={Residence} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
