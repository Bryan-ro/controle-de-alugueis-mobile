import "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import AddResidence from "./screens/AddResidence";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddResidence" component={AddResidence} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
