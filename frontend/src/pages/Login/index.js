import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

import Switch from 'react-switch';
import { shade } from 'polished';

import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function Login ({ toggleTheme }) {
    const [ username, setUsername ] = useState('');

    const history = useHistory();

    const { title, colors } = useContext(ThemeContext)

    async function handleSubmit (e) {
        e.preventDefault();

        const response = await api.post('/devs', {username});

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />  
                <button type="submit">Enviar</button>
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
            </form>
        </div>  
    );
}
