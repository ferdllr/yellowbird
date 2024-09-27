"use client"
import React, { useState, useEffect } from 'react';
import LogoIcon from '../components/LogoIcon';
import './login.css'
import { storeToken } from '../api/authHandler';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginRequestBody {
    email: string;
    password: string;
}

const Home: React.FC = () => {
    const [email, setEmail] = useState('email');
    const [password, setPassword] = useState('senha');
    const [feedback, setFeedback] = useState('insira seu email e senha');
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const data: LoginRequestBody = { email, password };
        try{
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
     
            if (!response.ok) {
                setFeedback('Conta não encontrada');
            } else {
                const responseData = await response.json();
                storeToken(responseData.token)
                console.log(responseData);
                setFeedback('usuário logado com sucesso! Redirecionando ao home')
                setTimeout(() => {
                    router.replace('/');
                    router.refresh();
                }, 2000);
            }
        } catch(error: any){
            setFeedback('Conta não encontrada');
        }
      }

  return (<div className='main-div-login'>
    <div className='main-page-login'>
    <LogoIcon></LogoIcon>
        <h1>login</h1>
        <div className='login-form-div'>
            <form onSubmit={onSubmit} className='login-form'>
                <h4>email:</h4>
                <input id="standard-adornment-email"value={email}onChange={(e) => setEmail(e.target.value)} className='form-input-login' name="email"/>
                <h4>senha:</h4>
                <input id="standard-adornment-password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input-login' name="senha"/>
                <button type="submit" className='login-button'>entrar</button>
            </form>
            <h5 className='h5-feedback'>{feedback}</h5>
            <Link href="/register">não possui conta? clique aqui!</Link>
        </div>
    </div>
  </div>
    
  );
};

export default Home;
