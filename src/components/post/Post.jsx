import './Post.css';
import { MoreVert } from '@mui/icons-material'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUsers] = useState([])

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`/users?userId=${post.userId}`);
            setUsers(response.data);
        };
        getUsers();
    }, [post.userId])

    const likeHandler = () => {
        try {

            axios.put('/posts/' + post._id + '/like', { userId: currentUser._id })

        } catch (error) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "person/noAvatar.png"} className='postProfileImg' alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={publicFolder + post.img} className='postImg' alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postLikeIcon" src={`${publicFolder}like.png`} onClick={likeHandler} alt="" />
                        <img className='postLikeIcon' src={`${publicFolder}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
