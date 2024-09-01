import "./SideBar.css";
import avatar from "../../images/avatar.png";

function Sidebar({ handleEditProfileClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img src={avatar} alt="default avatar" className="sidebar__avatar" />
        <p className="sidebar__username">username</p>
      </div>

      <div className="sidebar__buttons-container">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-profile-btn"
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn">Log out</button>
      </div>
    </div>
  );
}

export default Sidebar;
