import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

import { ThemeContext } from 'styled-components';

import './styles.css';

import api from '../../services/api';

import Switch from 'react-switch';

import logo from '../../assets/logo.svg';

import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

import itsamatch from '../../assets/itsamatch.png';

export default function Main ({ loggedUser, toggleTheme }) {
    const [ users, setUsers ] = useState([]);
    const [ matchDev, setMatchDev ] = useState(null);

    const { colors, title } = useContext(ThemeContext);

    async function loadUsers () {
        const response = await api.get('/devs', {
            headers: { 
                user: loggedUser
            }
        });

        setUsers(response.data);
    }

    
    useEffect(() => {
        loadUsers();
        const socket = io('http://localhost:3333', {
            query: { user: loggedUser }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        })
    }, [loggedUser]);

    async function handleLike (id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: loggedUser
            }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike (id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: loggedUser
            }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    return ( 
        <div className="main-container">
            <div className="main-header">
                <Link to="/">
                    <img src={logo} alt="Tindev" />
                </Link>
                <div className="theme-switch">
                    <Switch 
                        onChange={toggleTheme}
                        checked={title === 'dark'}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={10}
                        width={40}
                        handleDiameter={20}
                        offColor={shade(0.15, '#fff')}
                        onColor={'#000'}
                    />
                </div>
            </div>
            { users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}

            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            )}
        </div>
    );
}
