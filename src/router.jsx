import "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import AddResidence from "./screens/AddResidence";
import Residence from "./screens/Residence";
import AddTenant from "./screens/AddTenant";
import Tenant from "./screens/Tenant";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddResidence" component={AddResidence} />
                <Stack.Screen name="Residence" component={Residence} />
                <Stack.Screen name="AddTenant" component={AddTenant}></Stack.Screen>
                <Stack.Screen name="Tenant" component={Tenant}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
