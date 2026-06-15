import React, { useEffect, useState } from 'react'
import { getFirestore, doc, setDoc, collection, addDoc, query, where, getDocs, serverTimestamp, orderBy, limit, startAfter } from "firebase/firestore";
import ProductCard from '../component/productCard';
import { getAuth } from 'firebase/auth';
import PostCard from '../component/PostCard';
import axios from 'axios';

const Home = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState("");
    const [posts, setPosts] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const db = getFirestore();

    const addPost = async (e) => {
        e.preventDefault();

        console.log("file", file);
        console.log("title", title)

        const formData = new FormData();
        // {}
        formData.append("file", file);
        //{file: file}
        formData.append("upload_preset", "posts-image");

        const res = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);

        try {
            const docRef = await addDoc(collection(db, "posts"), {
                user_name: currentUser.displayName,
                profile: currentUser.photoURL,
                email: currentUser.email,
                userId: currentUser.uid,
                title,
                imageUrl: res.data.url,
                posted_time: serverTimestamp()
            });
            setReFetch(!reFetch)
            console.log("Document written with ID: ", docRef.id);

        } catch (error) {
            console.log("error", error)
        }
    }

    const getPost = async() => {
        try {
            const q = query(collection(db, "posts"), orderBy("posted_time", "asc"), limit(10), startAfter(0));

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

    useEffect(() => {
        getPost();
    }, [reFetch])

    return (
        <div>
            <form onSubmit={addPost}>
                <label htmlFor="">
                    image url: <input type="file" onChange={(e) => {setFile(e?.target?.files[0])}} />
                </label>
                <br />
                <label htmlFor="">
                    Title: <textarea value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </label>
                <br />
                
                <br />
                <button type='submit'>Add</button>
            </form>
            <div className="" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 20}}>
                {
                    posts.map((eachPost) => {
                        return(
                            <PostCard
                                refetchFunc={() => {setReFetch(!reFetch)}}
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