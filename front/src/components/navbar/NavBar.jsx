import styles from "./Navbar.module.css"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    Swal.fire({
                title: "You’ve been logged out",
                text: "See you soon!",
                icon: "success"
              });
    navigate("/home");
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
          <img src={logo} alt="Logo" />
      </div>

      <div className={styles.center}>
        <ul className={styles.navList}>
          <Link to="/home">HOME</Link>
          <Link to="/appointments">APPOINTMENTS</Link>
          <Link to="/aboutus">ABOUT US</Link>
        </ul>
      </div>

      <div className={styles.name}>
        {user ? (
          <>
            <p>Welcome, {user.user.name}</p>
            <button className={styles.session} onClick={handleLogout}> Logout </button>
          </>
        ) : (
            <Link to="/login" className={styles.session}> Login </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;