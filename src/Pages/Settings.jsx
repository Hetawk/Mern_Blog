import Sidebar from "../Sidebar/Sidebar"
import "./Settings.css"
// import EKD2 from "../img/ekd_bridge.JPG"
import { useContext, useState } from "react"
import { Context } from "../context/Context";
import axios from "axios";

export default function Settings
    () {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://127.0.0.1:7000/img"
    // const PF = "http://127.0.0.1:7000/api/img"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        // uploading file
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profile = filename;
            try {
                await axios.post("/upload", data);

            } catch (err) {
                console.log("File handling error");
            }

        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" })
            // console.log("File handling error");
        }

    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className=" settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.profile}   //-------------/
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter strong password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="settingsSubmit"
                        type="submit"
                    >Update</button>
                    {success && (
                        <span style={{ color: "green", textAlign: "center", margin: "20px" }}>Profile has been updated..</span>)}
                </form>
            </div>
            <Sidebar />

        </div>
    );
}
