import React, { FormEvent, useState } from 'react';
import './textpost.css'
import Link from 'next/link';
import { getUserInfo } from '../api/authHandler';

interface MessageProps {
  isLogged: boolean;
  userId: string;
}

interface postRequestBody {
  author: string;
  text: string;
  likes: string[];
}

const PostCreator: React.FC<MessageProps> = (props) => {
  const [postText, setPostText] = useState("");
  if (!props.isLogged) {return (
    <div className='createpost-card'>
      <Link href="/login">Crie ou conecte em sua conta para criar postagens</Link>
    </div>
  )}
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data: postRequestBody = {author: props.userId, text: postText, likes: []}
    try{
        const response = await fetch('http://localhost:4000/api/Post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
          console.log("algo deu errado")
        }
        console.log(await response.json)
    } catch(error: any){
        throw Error("não foi possivel criar post")
    }
  }

 return (
   <div className="createpost-card">
        <form onSubmit={onSubmit} className='createpost-form'>
          <input type="text" name="name" value={postText}onChange={(e) => setPostText(e.target.value)} className='createpost-text-input'/>
          <button type="submit" className='createpost-submit-button'>Submit</button>
        </form>
   </div>
 );
};

export default PostCreator;