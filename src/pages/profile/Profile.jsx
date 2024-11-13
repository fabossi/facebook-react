import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router'

export default function Profile() {
    const [user, setUsers] = useState([])

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const username = useParams().username;


    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`/users?username=${username}`);
            setUsers(response.data);
        };
        getUsers();
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture ? publicFolder + user.coverPicture : publicFolder + "person/noCover.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.coverPicture ? publicFolder + user.coverPicture : publicFolder + "person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}