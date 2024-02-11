import PostForm from '@/components/posts/PostForm'
import Posts from '@/components/posts/Posts'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20">
      <Posts />
    </main>
  )
}
