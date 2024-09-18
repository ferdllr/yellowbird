"use client"
import React, { useState, useEffect } from 'react';
import Player from '../app/components/Player';
import './homepage.css'
import TextPost from './components/TextPost';
import LogoIcon from './components/LogoIcon';
import PostCreator from './components/postCreator';
import PostContainer from './components/postContainer';
import { decryptToken, getUserInfo } from './api/authHandler';

const Home: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [userId, setUserId] = useState("")
  useEffect(() => {

    const checkUserLoggedIn = async() => {
      const userInfo = await getUserInfo()
      if (userInfo){
        setUserLoggedIn(true)
        setUserId(userInfo.id)
      }
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/Post/getAll');
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data = await response.json();
        setFeedPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    checkUserLoggedIn()
    fetchPosts()
  })
  

  return (<div className='main-div'>
    <LogoIcon></LogoIcon>
    <div className='main-page'>
      <PostCreator isLogged={userLoggedIn} userId= {userId}></PostCreator>
      <PostContainer posts={feedPosts}></PostContainer>
    </div>
  </div>
    
  );
};

export default Home;
