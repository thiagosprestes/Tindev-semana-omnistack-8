import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AsyncStorage, SafeAreaView, Image, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import logo from '../../assets/logo.png';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

import itsamatch from '../../assets/itsamatch.png';

import api from '../../services/api';

export default function Main ({ route, navigation }) {
    const [ users, setUsers ] = useState([]);
    const [ matchDev, setMatchDev ] = useState(null);

    async function loadUsers () {
        const response = await api.get('/devs', {
            headers: {
                user: route.params.user
            }
        });

        setUsers(response.data);
    }

    useEffect(() => {
        loadUsers();
    }, [route.params.user]);

    useEffect(() => {
        const socket = io('http://10.0.0.57:3333', {
            query: { user: route.params.user }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [route.params.user]);

    async function handleLike () {
        const [ user, ...rest ] = users;

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {
                user: route.params.user
            }
        });

        setUsers(rest);
    }

    async function handleDislike () {
        const [ user, ...rest ] = users;

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {
                user: route.params.user
            }
        });

        setUsers(rest);
    }

    async function handleLogout () {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                {users.length == 0 ? <Text style={styles.empty}>Acabou :(</Text> 
                : (
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{ uri: `${user.avatar}` }} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
            {users.length > 0 && 
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            }

            { matchDev && (
                <View style={styles.matchContainer}>
                    <Image style={styles.matchImage} source={itsamatch} />
                    <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />

                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>     
                    
                    <TouchableOpacity onPress={() => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>               
                </View>
            ) }
        </SafeAreaView>
    );
}
