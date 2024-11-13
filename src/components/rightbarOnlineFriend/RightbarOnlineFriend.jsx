import './RightbarOnlineFriend.css';

export default function RightbarOnlineFriend({ user }) {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={publicFolder + user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
