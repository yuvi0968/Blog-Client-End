import React, { useState, useEffect } from 'react';
import service from '../appwrite/dbService';
import { Container, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/authSlice';

const AllPost = () => {
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  console.log("User Details is Here :: ", user);
  useEffect(() => {
    (async () => {
      try {
        const posts = await service.getPosts([]);
        console.log("Posts :<><><> ", posts);
        if (posts) {
          setPost(posts.documents);
          dispatch(addPost(posts.documents));
        }
      } catch (error) {
        console.log("Error fetching Post ----> ", error);
      }
    })();
  }, [dispatch]);
  const postData = useSelector(state => state.auth.postData);



  console.log('post : ', post);
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className='p-2 w-1/4' >
              <PostCard {...post} />
              {/* <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} /> */}
            </div>
          ))}

          {/* {postData.map(postItem => {
            return postItem.data.map(data => {
              return (
                <div key={data.$id} className='p-2 w-1/4' >
                  {console.log("CheckMate is ----> ", postItem)}
                  {console.log("CheckMate is Now ::::: ", data)}
                  <PostCard {...data} key={data.$id} />
                </div>
              )
            })
          })} */}
        </div>
      </Container>
    </div>
  )
}

export default AllPost
