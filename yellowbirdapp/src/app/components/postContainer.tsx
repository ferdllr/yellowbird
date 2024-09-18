import React from 'react';
import TextPost from './TextPost'
import { postModel } from './postModel';

interface MessageProps {
    posts: postModel[]
}

const PostContainer: React.FC<MessageProps> = (props) => {
 return (
   <div className="post-container">
    {props.posts.map((post, index) => (
        <TextPost key={index} post={post}></TextPost>
    ))}
   </div>
 );
};

export default PostContainer;
