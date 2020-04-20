import React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes () {
    const id = AsyncStorage.getItem('user');

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Login" component={Login} />                
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
