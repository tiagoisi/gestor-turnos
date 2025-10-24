import styles from "./NavBar.module.css"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

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
      title: "You've been logged out",
      text: "See you soon!",
      icon: "success"
    });
    navigate("/home");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.left}>
          <Link to="/home" className={styles.logoLink}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.center}>
          <ul className={styles.navList}>
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/appointments">APPOINTMENTS</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
          </ul>
        </div>

        <div className={styles.right}>
          {user ? (
            <div className={styles.userSection}>
              <p className={styles.welcomeText}>Welcome, <span>{user.user.name}</span></p>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
              <Link to="/login" className={styles.loginBtn}>
              Login
              <FaArrowRightToBracket />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;