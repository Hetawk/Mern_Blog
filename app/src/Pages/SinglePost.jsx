import "./SinglePost.css"
// import Classmate1 from "../img/class_mate1.jpeg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";

export default function SinglePost
    () {
    const location = useLocation()
    const path = location.pathname.split("/")[2];

    const [post, setPost] = useState({});
    const PF = "http://127.0.0.1:7000/img/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);



    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            // console.log(res)
        };
        getPost();
    }, [path]);
    // console.log(location.pathname.split("/")[2])

    // delete function
    const handleDelete = async () => {
        try {
            // delete post using the username and post id attach to it
            await axios.delete(`/posts/ ${post._id}`, {
                data: { username: user.username },
            });
            // after deleting go to home page
            window.location.replace("/");
        } catch (err) {
            console.log(err)
        }
    };
    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/ ${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err)
        }
    };

    // console.log(post.username === user.username)
    return (
        <div className="singlepost">
            <div className="singlepostWrapper">
                {post.photo && (
                    <img
                        className="singlepostImg"
                        src={PF + post.photo}                   //------------//
                        alt=""
                    />
                )}
                {// if user is in updateMode then update the text, if not then excute the curent h1 
                    updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className="singlepostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    )
                        : (
                            <h1 className="singlepostTitle">
                                {title}
                                {/* if the post belong to a user, show these edit or delete buttons */}
                                {post.username === user?.username && (
                                    <div className="singlepostEdit">
                                        <i
                                            className="singlepostIcon far fa-edit"
                                            onClick={() => setUpdateMode(true)}
                                        ></i>
                                        <i
                                            className="singlepostIcon far fa-trash-alt"
                                            onClick={handleDelete}
                                        ></i>
                                    </div>
                                )}
                            </h1>

                        )
                }
                <div className="singlepostInfo">
                    <span className="singlepostAu">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlepostDate">{new Date(post.createdAt).toDateString()}</span>

                </div>
                {updateMode ? (
                    <textarea
                        className="singlepostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlepostDesc">
                        {desc}
                    </p>
                )}
                {/* update post button */}
                {updateMode && (
                    <button 
                    className="singlepostButton" 
                    onClick={handleUpdate}>Update
                    </button>
                )}
            </div>

        </div>
    );
}