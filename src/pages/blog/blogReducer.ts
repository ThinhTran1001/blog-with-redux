import {
  createAction,
  createReducer,
  current,
  nanoid,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
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

// export const createPost = createAction(
//   'blog/createPost',
//   function (post: Omit<Post, 'id'>) {
//     return {
//       payload: {
//         ...post,
//         id: nanoid(),
//       },
//     };
//   }
// );
// export const deletePost = createAction<string>('blog/deletePost');
// export const startEditingPost = createAction<string>('blog/startEditingPost');
// export const cancelEditingPost = createAction('blog/cancelEditingPost');
// export const finishEditingPost = createAction<Post>('blog/finishEditingPost');

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPostIndex = state.postList.findIndex(
        (post) => post.id === postId
      );
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1);
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      state.editingPost =
        state.postList.find((post) => post.id === postId) || null;
    },
    cancelEditingPost: (state) => {
      state.editingPost = null;
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload;
          return true;
        }
        return false;
      });
      state.editingPost = null;
    },
    createPost: {
      reducer(state, action: PayloadAction<Post>) {
        const post = action.payload;
        state.postList.push(post);
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid(),
        },
      }),
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state));
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state));
      });
  },
});

export const { startEditingPost,
  cancelEditingPost,
  finishEditingPost,
  deletePost,
  createPost,
} = blogSlice.actions;

const blogReducer = blogSlice.reducer;

export default blogReducer;
// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(createPost, (state, action) => {
//       const post = action.payload;
//       state.postList.push(post);
//     })
//     .addCase(deletePost, (state, action) => {
//       const postId = action.payload;
//       const foundPostIndex = state.postList.findIndex(
//         // eslint-disable-next-line eqeqeq
//         (post) => post.id === postId
//       );
//       if (foundPostIndex !== -1) {
//         state.postList.splice(foundPostIndex, 1);
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const postId = action.payload;
//       state.editingPost =
//         state.postList.find((post) => post.id === postId) || null;
//     })
//     .addCase(cancelEditingPost, (state) => {
//       state.editingPost = null;
//     })
//     .addCase(finishEditingPost, (state, action) => {
//       const postId = action.payload.id;
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload;
//           return true;
//         }
//         return false;
//       });
//       state.editingPost = null;
//     })
//     .addMatcher(
//       (action) => action.type.includes('cancel'),
//       (state, action) => {
//         console.log(current(state));
//       }
//     );
// });
// export default blogReducer;

