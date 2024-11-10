import './ClosestFriends.css';

export default function ClosestFriends({ user }) {
    return (
        <li className="sidebarFriend">
            <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}
