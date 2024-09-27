import { createAction, createReducer } from '@reduxjs/toolkit';
import { Post } from '../../types/blog.type';
import { initialPostList } from '../../constants/blog';

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null,
};

export const createPost = createAction<Post>('blog/createPost');
export const deletePost = createAction<string>('blog/deletePost');
export const startEditingPost = createAction<string>('blog/startEditingPost');
export const cancelEditingPost = createAction('blog/cancelEditingPost');
export const finishEditingPost = createAction<Post>('blog/finishEditingPost');

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createPost, (state, action) => {
      const post = action.payload;
      state.postList.push(post);
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload;
      const foundPostIndex = state.postList.findIndex(
        // eslint-disable-next-line eqeqeq
        (post) => post.id === postId
      );
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1);
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload;
      state.editingPost =
        state.postList.find((post) => post.id === postId) || null;
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null;
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload;
          return true;
        }
        return false;
      });
      state.editingPost = null;
    });
});
export default blogReducer;
