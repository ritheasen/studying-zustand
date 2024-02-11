// "use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {Toaster ,toast} from 'react-hot-toast'
import { usePostsStore } from '@/store/Posts'
import { PostModel } from '@/type/PostModel'

type PostFormProps = {
    selectedPost: PostModel;
    isEdit: boolean;
    cancelEdit: () => void;
};

const PostForm = ({ selectedPost, isEdit, cancelEdit}: PostFormProps) => {
    console.log('selectedPost', selectedPost);
    
    const { addPosts, editPosts} = usePostsStore()
    const [postId, setPostId] = useState(isEdit ? selectedPost?.id : 0)
    const [title, setTitle] = useState(isEdit ? selectedPost?.title : '');
    const [description, setDescription] = useState(isEdit ? selectedPost?.description : '');
  
    // const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        // Update the state when selectedPost changes (edit button is clicked)
        if (isEdit && selectedPost) {
          setTitle(selectedPost.title);
          setDescription(selectedPost.description);
        }
      }, [selectedPost, isEdit]);

    const handleAddPost = (e: { preventDefault: () => void }) => {
        // console.log('add post');
        
        e.preventDefault()

        // console.log(title, description);
        
        if(!title || !description) {
            toast.error('Please add a title and description')
            return
        }

        const newPost = {
            id: Date.now(),
            title,
            description
        }

        addPosts(newPost)
        toast.success('Post added successfully')

        setTitle('')
        setDescription('')

 
    }

    const handleEditPost = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log(isEdit);
        

        // console.log(title, description);
        
        if(!title || !description) {
            toast.error('Please add a title and description')
            return
        }

        const updaetdPost = {
            id: selectedPost.id,
            title,
            description
        }

        editPosts(updaetdPost.id, updaetdPost)
        toast.success('Post updated successfully')

        setTitle('')
        setDescription('')

        cancelEdit();
    }

  return (
    <form className='bg-white p-3 rounded border'>
        <h1 className='font-bold '>Create Post</h1>
        <Input
        className='py-2 rounded border'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea 
                className='py-2 mt-2 mb-2 rounded border'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        <Button className='rounded border'
        onClick={isEdit ? handleEditPost : handleAddPost}
        >
            {isEdit ? 'Edit' : 'Add'}
        </Button>
    </form>
  )
}

export default PostForm