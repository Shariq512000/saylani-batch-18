import React, { useState } from "react";
import "./PostCard.css";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";

const PostCard = ({ post, db, refetchFunc, currentUser }) => {

    // console.log("post", post)

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [photoUrl, setPhotoUrl] = useState("")

    const handleClose = () => {
        setShow(false);
        setTitle(post.title);
        setPhotoUrl("")
    }

    const date = new Date(post.posted_time.seconds * 1000);
    // 12-6-2026 9:
    const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    //   Date: DD --> 12, 
    //   Month: MM --> 02, MMM --> Feb, MMMM: Febuary 
    //   Year:  YY --> 26, YYYY --> 2026
    //   hh --> 0, 23 HH --> 1, 12 AM, PM
    //   mm -->
    //   ss -->

    const updatePost = async() => {
        const updateTimestamp = await updateDoc(doc(db, 'posts', post.id), {
            // timestamp: serverTimestamp()
            title,
            imageUrl: photoUrl,
        });
        handleClose();
        refetchFunc()
    }

    return (
        <>
            <div className="post-card">
                <div className="d-flex align-items-center justify-content-between">

                    <div className="post-header">
                        <img
                            src={post.profile}
                            alt={post.user_name}
                            className="profile-image"
                        />

                        <div className="user-info">
                            <h4>{post.user_name}</h4>
                            <span>{moment(formatedDate, "DD-MM-YYYY hh:mm:ss").fromNow()}</span>
                        </div>
                    </div>
                    {
                        post.userId == currentUser.uid ?
                        <button onClick={() => {setShow(true)}}>Edit</button>
                        :
                        null
                    }

                </div>

                <div className="post-content">
                    <p>{post.title}</p>

                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="Post"
                            className="post-image"
                        />
                    )}
                </div>

                <div className="post-actions">
                    <button>👍 Like</button>
                    <button>💬 Comment</button>
                    <button>↗ Share</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="">
                        Title: <input type="text" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                    </label>
                    <br />
                    <br />
                    <label htmlFor="">
                        Image Url: <input type="text" value={photoUrl} onChange={(e) => {
                            setPhotoUrl(e.target.value)
                        }} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updatePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostCard;