import Router from './src/routers';

import { StatusBar } from 'react-native';

import { LoginStatus } from './src/context/LoginContext';



StatusBar.popStackEntry({
    barStyle: 'default'
});


export default function App() {
    return (
        <LoginStatus>
            <Router />
        </LoginStatus>
    );
}
