import "./Write.css";
// import PostBackground from "../img/car1.jpeg";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";

export default function Write
    () {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        }
        // uploading file
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log("File handling error");
            }

        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {
            console.log("File handling error");
        }

    };

    return (
        <div className="write">
            {/* upload img when user click the + icon */}
            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="writeImg"
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus" />
                    </label>                                                      {/*onChange set new file */}
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="writeFormGroup">
                    <div className="writeFormTextArea">

                        <div className="writeFormGroupTextBar">
                            <button type="button" className="writeIconHeader btn" data-element="bold">
                                <i className="fa fa-bold"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="italic">
                                <i className="fa fa-italic"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="underline">
                                <i className="fa fa-underline"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="insertOrderedList">
                                <i className="fa fa-list-ol"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="insertUnorderList">
                                <i className="fa fa-list-ul"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="createLink">
                                <i className="fa fa-link"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="justifyLeft">
                                <i className="fa fa-align-left"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="justifyCenter">
                                <i className="fa fa-align-center"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="justifyRight">
                                <i className="fa fa-align-right"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="justifyFull">
                                <i className="fa fa-align-justify"></i>
                            </button>
                            <button type="button" className="writeIconHeader btn" data-element="insertImage">
                                <i className="fa fa-image"></i>
                            </button>
                        </div>

                        <textarea
                            type="text"
                            className="writeInput writeText"
                            placeholder="Tell your story..."
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="writeSubmit" type="submit" >Publish</button>
                </div>
            </form>

        </div>
    );
}
