import "./Topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {

  const { user } = useContext(AuthContext);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input className="searchInput" type="text" placeholder="Search for friends, photos, or videos" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <div className="topbarIconBadge">1</div>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <div className="topbarIconBadge">2</div>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <div className="topbarIconBadge">1</div>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} >
          <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
