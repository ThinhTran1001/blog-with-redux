import { createAction, createReducer } from '@reduxjs/toolkit';
import { Post } from '../../types/blog.type';
import { initialPostList } from '../../constants/blog';

interface BlogState {
  postList: Post[];
}

const initialState: BlogState = {
  postList: initialPostList,
};

export const createPost = createAction<Post>('blog/createPost');
const blogReducer = createReducer(initialState, (builder) => {
  builder.addCase(createPost, (state, action) => {
    const post = action.payload;
    state.postList.push(post);
  });
});
export default blogReducer;
