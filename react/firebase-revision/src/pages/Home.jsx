import React, { useEffect, useState } from 'react'
import { getFirestore, doc, setDoc, collection, addDoc, query, where, getDocs, serverTimestamp, orderBy, limit, startAfter, onSnapshot } from "firebase/firestore";
import ProductCard from '../component/productCard';
import { getAuth } from 'firebase/auth';
import PostCard from '../component/PostCard';
import axios from 'axios';
import { Link } from 'react-router';

const Home = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [posts, setPosts] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const db = getFirestore();

    const addPost = async (e) => {
        e.preventDefault();


        try {

            let imageRes;

            if (file) {
                const formData = new FormData();
                // {}
                formData.append("file", file);
                //{file: file}
                formData.append("upload_preset", "posts-image");
                imageRes = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);
            }
            const docRef = await addDoc(collection(db, "posts"), {
                user_name: currentUser.displayName,
                profile: currentUser.photoURL,
                email: currentUser.email,
                userId: currentUser.uid,
                title,
                posted_time: serverTimestamp(),
                imageUrl: imageRes?.data?.url || null,
            });
            setReFetch(!reFetch)

        } catch (error) {
            console.log("error", error)
        }
    }

    const getPost = async () => {
        try {
            // , limit(10), startAfter(0)
            const q = query(collection(db, "posts"), orderBy("posted_time", "asc"));

            const querySnapshot = await getDocs(q);
            let productArr = []
            querySnapshot.forEach((doc) => {
                let newObj = {
                    ...doc.data(),
                    id: doc.id
                }
                productArr.push(newObj)
            });
            setPosts(productArr.reverse())

        } catch (error) {
            console.log("Err", error)
        }
    }

    // useEffect(() => {
    //     getPost();
    // }, [reFetch])

    useEffect(() => {
        let unsubscribe;

        const getRealTimeUpdates = () => {

            const q = query(collection(db, "posts"), orderBy("posted_time", "asc"));

            unsubscribe = onSnapshot(q, (querySnapshot) => {

                let productArr = []
                querySnapshot.forEach((doc) => {
                    let newObj = {
                        ...doc.data(),
                        id: doc.id
                    }
                    productArr.push(newObj)
                });
                setPosts(productArr.reverse());

            });
        }
        getRealTimeUpdates()

        return () => {
            unsubscribe();
        }
    }, [])

    // mount, update, unmount

    console.log("Posts", posts)

    return (
        <div>
            <form onSubmit={addPost}>
                <label htmlFor="">
                    image url: <input type="file" onChange={(e) => { setFile(e?.target?.files[0]) }} />
                </label>
                <br />
                <label htmlFor="">
                    Title: <textarea value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </label>
                <br />

                <br />
                <button type='submit'>Add</button>
            </form>
            <br />
            <Link to={"/"}>Go To Dashboard</Link>
            <br />
            <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                {
                    posts.map((eachPost) => {
                        return (
                            <PostCard
                                refetchFunc={() => { setReFetch(!reFetch) }}
                                currentUser={currentUser}
                                db={db}
                                key={eachPost.id}
                                post={eachPost}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home