"use client"
import React, { useState } from 'react'
import { usePostsStore } from '@/store/Posts'
import { PostModel } from '@/type/PostModel'
import { Button } from '@/components/ui/button'
import PostForm from './PostForm'
import toast from 'react-hot-toast'

const Posts = () => {
        const { posts, deletePosts } = usePostsStore()
        const [isEdit, setIsEdit] = useState(false)
        const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);

        const cancelEdit = () => {
            setIsEdit(false);
          }

        const editAPost = (id: number) => {
            
            const post = posts.filter((post: PostModel) => post.id === id)[0];
            // console.log(post);
            setSelectedPost(post)
            setIsEdit(true)
        }

        const deletePost = (id: number) => {
            deletePosts(id)

            toast.success('Post deleted successfully')
        }

        // console.log(selectedPost, isEdit);
        
    return (
        <>
            <PostForm selectedPost={selectedPost} isEdit={isEdit} cancelEdit={cancelEdit}/>
            <h1 className='py-2 text-4xl font-bold text-center'>Posts</h1>
            <div className="grid grid-cols-2 gap-2">
                {posts ? (posts.map((post: PostModel) => 
                (
                    
                <div className='mb-4 rounded bg-green-500 p-4 w-80' key={post.id}>
                                <h2 className='font-bold'>{post.title}</h2>
                                <p className='py-2'>{post.description}</p>
                                <Button className='bg-blue-500 text-white px-4 py-2 mr-2 rounded'
                                onClick={() => editAPost(post.id)}
                                >
                                    Edit
                                </Button>
                                <Button className='bg-red-500 text-white px-4 py-2 rounded'
                                onClick={() => deletePost(post.id)}
                                >
                                    Delete
                                </Button>
                        </div>
                
                )))
                : 
                <p>no post found</p>
                }
                </div>
        </>
    )
}

export default Posts