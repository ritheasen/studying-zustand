import { PostModel } from '@/type/PostModel';
import { create } from 'zustand'

interface PostState {
    posts: PostModel[];
    addPosts: (newPost: PostModel) => void;
    editPosts: (id: number, updatePost: PostModel) => void;
    deletePosts: (id: number) => void;
}

export const usePostsStore = create<PostState>((set) => ({
  posts: [
    {
        id: 1,
        title: "Post 1",
        description: "Description 1",
    },
  ],
  addPosts: (newPost) => {
    set((state) => {
      return {posts: [...state.posts, newPost]}
    })
  },
editPosts: (id, updatePost) => {
    set((state) => {
            const updatedPosts = state.posts.map((post) => {
                    if(post.id === id) {
                            return {...post, ...updatePost};
                    }
                    return post;
            })
            return {posts: updatedPosts}
    })
},
deletePosts: (id) => {
    set((state) => {
            const updatedPosts = state.posts.filter((post) => post.id !== id);
            return {posts: updatedPosts}
    })
}
}))