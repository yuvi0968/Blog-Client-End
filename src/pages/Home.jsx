import React, { useState, useEffect } from 'react'
import service from '../appwrite/dbService'
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status);

    // console.log("USER STATUS :::: ", loggedIn);

    useEffect(() => {
        if (authStatus) {
            service.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
        }

    }, []);
    console.log("From Home ----:::", posts);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full '>
                            <h1 className="text-2xl font-bold hover:text-gray-500 text-white">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (authStatus)
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap">
                        {posts?.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )

    // authStatus ? (
    //     posts.length ?(
    //         <div className='w-full py-8'>
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     {posts?.map((post) => (
    //                         <div key={post.$id} className='p-2 w-1/4'>
    //                             <PostCard {...post} />
    //                         </div>
    //                     ))}
    //                 </div>
    //             </Container>
    //         </div>
    //        ) : "" ) :(
        
    //         <div className='w-full py-8'>
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     {posts?.map((post) => (
    //                         <div key={post.$id} className='p-2 w-1/4'>
    //                             <PostCard {...post} />
    //                         </div>
    //                     ))}
    //                 </div>
    //             </Container>
    //         </div> )

}

export default Home;

