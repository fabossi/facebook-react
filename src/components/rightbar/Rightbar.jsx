import './Rightbar.css';
import { Users } from '../../dummyData'
import RightbarOnlineFriend from '../rightbarOnlineFriend/RightbarOnlineFriend';

export default function Rightbar({ profile }) {

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
          {Users.map((user) => <RightbarOnlineFriend key={user.id} user={user} />)}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className='rightBarTilte'>User information</h4>

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className='rightBarTilte'>User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/1.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/2.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/3.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/4.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/5.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
          <div className="rightbarFollowing">
            <img className='rightbarFollowingImg' src="assets/person/6.jpeg" alt="" />
            <span className="rightBarFollowingName">John Carter </span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
