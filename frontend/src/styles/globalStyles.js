import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        background: ${props => props.theme.colors.background};
    }

    body, input, button {
        font-family: Arial, Helvetica, sans-serif;
    }

    input {
        background-color: ${props => props.theme.colors.inputBg};
        border-color: ${props => props.theme.colors.borderColor} !important;
    }

    .main-container ul li footer {
        background: ${props => props.theme.colors.userCard};
        border: ${props => props.theme.colors.userCardBorder};
    }

    .main-container ul li footer strong {
        color: ${props => props.theme.title == 'dark' ? '#fff' : 'inherit'};
    }

    .main-container ul li .buttons button {
        background: ${props => props.theme.colors.userCard};
    }
`
