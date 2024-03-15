import React, { useState, useEffect } from 'react'
import service from '../appwrite/dbService'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();
    console.log("Slug ---", slug);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const post = await service.getPost(slug)
                    console.log('Appwrite post value ;;;', post);
                    if (post){
                        setPost(post);
                    }else  console.log();("Post not available");

                } else navigate("/");
            } catch (error) {
                console.log("Error from Appwrite get Post Method:", error);
            }
        }

        fetchPost();
    }, [slug, navigate, service, setPost]);

    return post ? (
        <div className='py-8'>
            <Container>
                {console.log("Edit Post ---->", post)}
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
