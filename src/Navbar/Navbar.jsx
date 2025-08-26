import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import './Navbar.css'
import { useSelector } from "react-redux";

const Navbar = () => {
  const [greeting, setGreeting] = useState('');
  const userData = useSelector(state => state?.userReducer?.userData);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning!');
    } else if (hours < 18) {
      setGreeting('Good afternoon!');
    } else {
      setGreeting('Good evening!');
    }
  }, []);

  return (
    <header className="navbar">
      <h1 className="navbar-greeting">Welcome {userData.name}, {greeting}</h1>
      <div className="navbar-profile-container">
        <div className="navbar-profile-icon">
          {
            userData?.profilePath ? (
              <img src={userData.profilePath.imageUrl} alt="profile" className="nav-profile"/>
            ) : (
              <CircleUser />
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar