"use client"
import React, { useState, useEffect } from 'react';
import LogoIcon from '../components/LogoIcon';
import './register.css'
import { storeToken } from '../api/authHandler';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
    posts: string[];
}

const Home: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('insira seu nome, email e senha');
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const data: RegisterRequestBody = {name: nickname, email, password, posts};
        try{
            const response = await fetch('http://localhost:4000/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
     
            if (!response.ok) {
                setFeedback('Não foi possivel registrar a conta');
            } else {
                setFeedback('usuário criado com sucesso! Redirecionando a pagina de login')
                setTimeout(() => {
                    router.replace('/login');
                    router.refresh();
                }, 2000);
            }
        } catch(error: any){
            setFeedback('Não foi possivel registrar a conta');
            console.log(error)
        }
      }

  return (<div className='main-div-register'>
    <div className='main-page-register'>
    <LogoIcon></LogoIcon>
        <h1>register</h1>
        <div className='register-form-div'>
            <form onSubmit={onSubmit} className='register-form'>
                <h4>nome:</h4>
                <input id="standard-adornment-nickname"value={nickname}onChange={(e) => setNickname(e.target.value)} className='form-input-register'/>
                <h4>email:</h4>
                <input id="standard-adornment-email"value={email}onChange={(e) => setEmail(e.target.value)} className='form-input-register'/>
                <h4>senha:</h4>
                <input id="standard-adornment-password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input-register'/>
                <button type="submit" className='register-button'>criar</button>
            </form>
            <h5 className='h5-feedback'>{feedback}</h5>
        </div>
    </div>
  </div>
    
  );
};

export default Home;
