import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import api from '../services/api';
import './Login.css';

export default function Login({ history }){

    // useState() => retorna um valor e uma function para alterar esse valor
    const [ username, setUsername ] = useState('');

    async function handleSubmit(e){
        e.preventDefault();// Bloqueia o redirecionamento para outra página pelo evento submit

        const response = await api.post('/devs', {
            username // short syntax para username(que o servidor espera receber) : username(variavel do estado da aplicação)
        })

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return(
        <div className="login-container">
            <form onSubmit={ handleSubmit }>
                <img src={logo} alt="Tindev" />
                <input 
                    type="text"
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value) }
                    // onChange retorna uma function com uma variavel "e", setUsername() irá atualizar o valor de username com o target.value
                />
                <button type="submit">Enviar</button>
            </form>
        </div>   
    )
}

