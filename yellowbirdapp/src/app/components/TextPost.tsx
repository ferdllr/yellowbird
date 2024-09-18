import React, { useEffect, useState } from 'react';
import './textpost.css';
import { postModel } from './postModel';

interface MessageProps {
  post: postModel;
}

const TextPost: React.FC<MessageProps> = (props) => {
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(true); // Flag para verificar se o componente está montado

  // Função para buscar o usuário
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/getById?id=${props.post.author}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      const userJSON = await response.json();
      if (isMounted) {
        setUser(userJSON);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchUser();
    return () => setIsMounted(false);
  }, [props.post.author]);

  return (
    <div className="text-post">
      <div className="user-header">
        <h3>{user ? user.name : 'Carregando...'}</h3>
      </div>
      <p>{props.post.text}</p>
      <p>likes: {props.post.likes}</p>
    </div>
  );
};

export default TextPost;
