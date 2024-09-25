import React from 'react';
import CreatePost from './components/create-post/CreatePost';
import PostList from './components/post-list/PostList';

export default function Blog() {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  );
}
