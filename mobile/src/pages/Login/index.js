import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native';

import styles from './styles';

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Login ({ navigation }) {
    const [ user, setUser ] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user });
            }
        });
    }, []);

    async function handleLogin () {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS == 'ios'}
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no Github"
                placeholderTextColor='#999'
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
