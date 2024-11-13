import './Rightbar.css';
import { Users } from '../../dummyData'
import RightbarOnlineFriend from '../rightbarOnlineFriend/RightbarOnlineFriend';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser?.followings?.includes(user?.id));
  }, [currentUser, user?.id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friends.data);
      } catch (error) {
        console.error(error);
      }
    }
    getFriends();
  }, [user])

  const followAndUnfollowUser = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
        dispatch({ type: 'UNFOLLOW', payload: user.id });
      } else {
        await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id })
        dispatch({ type: 'FOLLOW', payload: user.id });
      }
    } catch (error) {
      console.error(error);
    }
    setFollowed(!followed)
  }

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className="birthdayText"><b>Polat Fostar</b> and <b>3 other friends</b> have a birthday today!</span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => <RightbarOnlineFriend key={user._id} user={user} />)}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={followAndUnfollowUser}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightBarTilte'>User information</h4>

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : '-'}</span>
          </div>
        </div>
        <h4 className='rightBarTilte'>Your friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link id="link" to={`/profile/${friend.username}`} key={friend._id}>
              <div className="rightbarFollowing">
                <img className='rightbarFollowingImg' src={friend.profilePicture ? publicFolder + friend.profilePicture : publicFolder + "person/noAvatar.png"} alt="" />
                <span className="rightBarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
